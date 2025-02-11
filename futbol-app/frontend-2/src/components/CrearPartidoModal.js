import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const CrearPartidoModal = ({ onPartidoCreado }) => {
    const [show, setShow] = useState(false);
    const [partido, setPartido] = useState({
        fecha: "",
        tipo: "Futbol_5",
        lugar: "",
        totalJugadores: 10,
        estado: "Disponible",
        imagen: "assets/images/marangoni_cancha_1.jpg",
        confirmados: []
    });

    const handleChange = (e) => {
        setPartido({ ...partido, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {

        const fechaPartido = new Date(partido.fecha);
        const opcionesDia = { weekday: "long" };
        const opcionesHora = { hour: "2-digit", minute: "2-digit" };

        const diaSemana = fechaPartido.toLocaleDateString("es-ES", opcionesDia);
        const hora = fechaPartido.toLocaleTimeString("es-ES", opcionesHora);

        const partidoConFormato = {
            ...partido,
            diaSemana,
            hora
        };

        fetch(`${process.env.REACT_APP_API_URL}/partidos/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(partidoConFormato),
        })
            .then((res) => res.json())
            .then(() => {
                setShow(false);
                onPartidoCreado(); // Refrescar la lista de partidos
                window.location.reload();
            })
            .catch((err) => console.error("Error al crear partido", err));
    };

    return (
        <div className="col-md-8 text-center">
            <button className="btn btn-success btn-lg fw-bold w-100" onClick={() => setShow(true)}>
                ➕ Crear Partido
            </button>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Partido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Fecha y Hora</Form.Label>
                            <Form.Control type="datetime-local" name="fecha" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tipo de Partido</Form.Label>
                            <Form.Select name="tipo" onChange={handleChange}>
                                <option>Futbol_5</option>
                                <option>Fútbol_7</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Ubicación</Form.Label>
                            <Form.Control type="text" name="lugar" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Máx. Jugadores</Form.Label>
                            <Form.Control type="number" name="totalJugadores" min="2" max="14" onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Crear Partido
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CrearPartidoModal;
