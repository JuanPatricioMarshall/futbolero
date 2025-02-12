import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form } from "react-bootstrap";


const Partido = () => {
    const { id } = useParams();
    const [partido, setPartido] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [nombreJugador, setNombreJugador] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/partidos/${id}`)
            .then((res) => res.json())
            .then((data) => setPartido(data))
            .catch((err) => console.error("Error cargando partido:", err));
    }, [id]);

    const handleConfirmar = () => {
        if (!nombreJugador.trim()) return; // Evitar nombres vacíos
        fetch(`${process.env.REACT_APP_API_URL}/partidos/${id}/jugadores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jugador: nombreJugador })
        })
            .then((res) => res.json())
            .then((data) => {
                setShowModal(false);
                window.location.reload();
            })
            .catch((err) => console.error("Error al unirse al partido", err));
    };

    if (!partido) {
        return <div className="text-center mt-5">Cargando partido...</div>;
    }

    return (
        <Container className="mt-4">
            {/* Imagen de la cancha */}
            <Card className="shadow-lg">
                <Card.Img
                    variant="top"
                    src={`${process.env.PUBLIC_URL}/${partido.imagen}`}
                    // src={`/${partido.imagen}`} // Agregar la barra inicial "/"
                    //   src={partido.imagen}
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
                            <Button variant="success" onClick={() => setShowModal(true)}>
                                ¡Sumarme al partido!
                            </Button>
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
                                        <tr key={index} className="text-center">
                                            <td>{index + 1}</td>
                                            <td>{jugador}</td>
                                            <td>
                                                <Badge bg="success">Confirmado ✅</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* Modal para ingresar el nombre */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Unirte al Partido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Ingresa tu nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Juan Pérez"
                                value={nombreJugador}
                                onChange={(e) => setNombreJugador(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleConfirmar}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Partido;
