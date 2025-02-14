import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import JugadorCardDrag from "./JugadorCardDrag";
import "./ModalAgregarJugador.css";

const ModalAgregarJugador = ({ isOpen, jugadores, onClose, onConfirm }) => {
    // 🔹 Los hooks SIEMPRE deben estar en la parte superior, sin condiciones
    const [disponibles, setDisponibles] = useState(jugadores);
    const [seleccionados, setSeleccionados] = useState([]);

    // 🔹 Si el modal está cerrado, renderizamos un `div` vacío en lugar de `return null`
    if (!isOpen) return <div style={{ display: "none" }} />;


    console.log("Modal recibido isOpen:", isOpen); // ✅ Depuración

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) return;

        const movedJugador = source.droppableId === "disponibles"
            ? disponibles.find(j => j._id === result.draggableId)
            : seleccionados.find(j => j._id === result.draggableId);

        if (!movedJugador) return;

        if (source.droppableId === "disponibles") {
            setDisponibles(disponibles.filter(j => j._id !== movedJugador._id));
            setSeleccionados([...seleccionados, movedJugador]);
        } else {
            setSeleccionados(seleccionados.filter(j => j._id !== movedJugador._id));
            setDisponibles([...disponibles, movedJugador]);

            // 🔹 Animación de lluvia triste al devolver un jugador
            const lluvia = document.createElement("div");
            lluvia.classList.add("lluvia-triste");
            document.body.appendChild(lluvia);
            setTimeout(() => lluvia.remove(), 2000);
        }
    };

    console.log("Modal recibido isOpen:", isOpen);

    return (
        // <div className={`modal ${isOpen ? "visible" : ""}`}>
        <div className={`modal ${isOpen ? "visible" : "oculto"}`} onClick={onClose}>
            <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Agregar jugadores al doparti</h2>
                    <button className="boton-volver" onClick={onClose}>⬅</button>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    {/* Zona de jugadores disponibles */}
                    <Droppable droppableId="disponibles" direction="horizontal">
                        {(provided) => (
                            <div className="jugadores-lista" ref={provided.innerRef} {...provided.droppableProps}>
                                {disponibles.map((jugador, index) => (
                                    <Draggable key={jugador._id} draggableId={jugador._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <JugadorCardDrag jugador={jugador} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* Zona de jugadores seleccionados */}
                    <Droppable droppableId="seleccionados" direction="horizontal">
                        {(provided) => (
                            <div className="zona-seleccion" ref={provided.innerRef} {...provided.droppableProps}>
                                <h3>Jugadores seleccionados</h3>
                                {seleccionados.map((jugador, index) => (
                                    <Draggable key={jugador._id} draggableId={jugador._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <JugadorCardDrag jugador={jugador} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <div className="boton-container" >
                    <button className="boton-confirmar" onClick={() => onConfirm(seleccionados)}>
                        <i className="fas fa-check"></i> Confirmar
                    </button>
                </div>

                {/* <button onClick={onClose} className="boton boton-cancelar">❌ Cancelar</button> */}
            </div>
        </div>
    );

};

export default ModalAgregarJugador;
