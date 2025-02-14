import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Table, Badge, Button } from "react-bootstrap";
import ModalAgregarJugador from "../components/ModalAgregarJugador";
import JSConfetti from "js-confetti";
import "./Partido.css";


// Llamar a `lanzarConfeti()` cuando confirmes la selección


const Partido = () => {
    const { id } = useParams();
    const [partido, setPartido] = useState(null);
    const [jugadores, setJugadores] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        async function cargarDatos() {
            try {
                // Obtener detalles del partido
                const partidoRes = await fetch(`${process.env.REACT_APP_API_URL}/partidos/${id}`);
                const partidoData = await partidoRes.json();
                setPartido(partidoData);

                // Obtener jugadores disponibles
                const jugadoresRes = await fetch(`${process.env.REACT_APP_API_URL}/jugadores`);
                const jugadoresData = await jugadoresRes.json();
                setJugadores(jugadoresData);

                // Obtener datos de los jugadores confirmados
                const jugadoresConfirmados = await Promise.all(
                    partidoData.confirmados.map(async (jugadorId) => {
                        const res = await fetch(`${process.env.REACT_APP_API_URL}/jugadores/${jugadorId}`);
                        return res.json();
                    })
                );
                setPartido((prev) => ({ ...prev, confirmados: jugadoresConfirmados }));
            } catch (err) {
                console.error("Error cargando datos:", err);
            }
        }

        cargarDatos();
    }, [id]);


    const handleBajarJugador = (jugadorId) => {
        fetch(`${process.env.REACT_APP_API_URL}/partidos/${id}/jugadores/${jugadorId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.ok) {
                    window.location.reload(); // 🔄 Recargar la página después de la eliminación
                } else {
                    console.error("Error al bajar al jugador");
                }
            })
            .catch((err) => console.error("Error en la solicitud:", err));
    };

    const handleConfirmar = (jugadoresSeleccionados) => {
        const jsConfetti = new JSConfetti();
        function lanzarConfetiDuradero(duracion = 3000, intervalo = 500) {
            const startTime = Date.now();

            const confettiInterval = setInterval(() => {
                jsConfetti.addConfetti();

                if (Date.now() - startTime > duracion) {
                    clearInterval(confettiInterval); // Detiene después del tiempo especificado
                }
            }, intervalo);
        }
        // Enviar cada jugador al backend
        Promise.all(
            jugadoresSeleccionados.map((jugador) =>
                fetch(`${process.env.REACT_APP_API_URL}/partidos/${id}/jugadores/${jugador._id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                })
            )
        )
            .then(() => {
                setModalAbierto(false);
                // lanzarConfetiDuradero();
                jsConfetti.addConfetti(); // Animación al confirmar
                window.location.reload();
            })
            .catch((err) => console.error("Error al agregar jugadores", err));
    };

    if (!partido) {
        return <div className="text-center mt-5">Cargando partido...</div>;
    }
    console.log(jugadores)
    if (!jugadores || jugadores.length === 0) {
        return <p>No hay jugadores disponibles.</p>;
    }

    console.log("Estado modalAbierto:", modalAbierto);

    return (
        <Container className="mt-4">
            {/* Imagen de la cancha */}
            <Card className="shadow-lg">
                <Card.Img
                    variant="top"
                    src={`${process.env.PUBLIC_URL}/${partido.imagen}`}
                    alt="Cancha de fútbol"
                    style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                    {/* Información del partido */}
                    <h2 className="fw-bold text-center mb-3">{partido.tipo}</h2>
                    <Row className="text-center">
                        <Col md={6}>
                            <h5>
                                📅 {new Date(partido.fecha).toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </h5>
                        </Col>
                        <Col md={6}>
                            <h5>
                                ⏰ {new Date(partido.fecha).toLocaleTimeString("es-ES", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </h5>
                        </Col>
                    </Row>

                    <Row className="mt-3 text-center">
                        <Col md={12}>
                            <h5>
                                📍 {partido.direccion}{" "}
                                <Badge bg={partido.estado === "Reservado" ? "success" : "danger"}>
                                    {partido.estado}
                                </Badge>
                            </h5>
                        </Col>
                    </Row>

                    {/* Cantidad de jugadores */}
                    <Row className="mt-4 text-center">
                        <Col md={12}>
                            <h5 className="fw-bold">
                                👥 {partido.confirmados.length} / {partido.totalJugadores} Jugadores Confirmados
                            </h5>
                        </Col>
                    </Row>

                    {partido.confirmados.length < partido.totalJugadores ? (
                        <div className="d-grid w-100">
                            <Button
                                variant="success"
                                onClick={() => {
                                    console.log("Abriendo modal..."); // <-- Verifica si el botón responde al clic
                                    setModalAbierto(true);
                                }}
                            >
                                ¡Sumarme al partido!
                            </Button>
                            {/* <Button variant="success" onClick={() => setModalAbierto(true)}>
                                ¡Sumarme al partido!
                            </Button> */}
                        </div>
                    ) : (
                        <div className="text-center text-white bg-danger p-2 fw-bold rounded">
                            ¡Estamos completos! 🚫
                        </div>
                    )}

                    {/* Tabla de jugadores */}
                    <Row className="mt-4">
                        <Col>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr className="text-center">
                                        <th>#</th>
                                        <th>Jugador</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {partido.confirmados.map((jugador, index) => (
                                        <tr key={jugador._id} className="text-center">
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link to={`/jugador/${jugador._id}`}>
                                                    <img
                                                        src={jugador.foto}
                                                        alt={jugador.nombre}
                                                        style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                                                        />
                                                     {jugador.nombre}
                                                </Link>
                                            </td>
                                            <td>
                                                <Badge bg="success">Confirmado ✅</Badge>
                                            </td>
                                            <td>
                                                <Badge bg="danger" onClick={() => handleBajarJugador(jugador._id)}>BAJARLO ❌</Badge>
                                                {/* <button
                                                    onClick={() => handleBajarJugador(jugador._id)}
                                                    className="badge-bajar"
                                                >
                                                    BAJARLO ❌
                                                </button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                {/* <tbody>
                                    {partido.confirmados.map((jugador, index) => (
                                        <tr key={index} className="text-center">
                                            <td>{index + 1}</td>
                                            <td>{jugador.nombre}</td>
                                            <td>
                                                <Badge bg="success">Confirmado ✅</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Nuevo Modal con Drag & Drop */}
            <ModalAgregarJugador
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                jugadores={jugadores}
                onConfirm={handleConfirmar}
            />
        </Container>
    );
};

export default Partido;
