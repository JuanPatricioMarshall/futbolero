import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form, Card } from "react-bootstrap";
import CrearPartidoModal from "../components/CrearPartidoModal";
import { get } from "mongoose";


function PartidosList() {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmados, setConfirmados] = useState({}); // Para manejar estado de "Sumarme/Bajarme"
  const [refresh, setRefresh] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [nombreJugador, setNombreJugador] = useState("");
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null); // 📌 Guarda el partido actual

  const handleAbrirModal = (partido) => {
    setPartidoSeleccionado(partido);
    setShowModal(true);
  };

  const handleConfirmar = () => {
    console.log(nombreJugador)
    console.log(partidoSeleccionado)

    if (!nombreJugador.trim() || !partidoSeleccionado) return; // Evitar nombres vacíos
    console.log(nombreJugador)
    fetch(`${process.env.REACT_APP_API_URL}/partidos/${partidoSeleccionado._id}/jugadores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jugador: nombreJugador })
    })
      .then((res) => res.json())
      .then(() => {
        setShowModal(false);
        setNombreJugador(""); // Limpiar campo
        console.log("about to reload")
        window.location.reload();
      })
      .catch((err) => console.error("Error al unirse al partido", err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/partidos/proximos`)
      .then((response) => {
        setPartidos(response.data); // Guardar los partidos en el estado
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los partidos:", error);
        setError("No se pudieron cargar los partidos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Cargando partidos...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <div className="container mt-4">
      {/* Título estilizado */}
      <div
        className="text-center py-4 mb-4"
        style={{
          background: "linear-gradient(90deg, #27ae60, #145a32)",
          borderRadius: "12px",
          color: "white",
        }}
      >
        <h1 className="fw-bold display-4">⚽ Próximos Partidos</h1>
        <p className="fs-5">Encuentra y organiza tus próximos partidos</p>
      </div>

      <div className="row justify-content-center">
        {partidos.length === 0 ? (
          <p className="text-center">No hay partidos disponibles.</p>
        ) : (
          partidos.map((partido) => {
            
            const estaLleno = partido.confirmados.length >= partido.totalJugadores;

            return (

              <div key={partido._id} className="col-md-8 mb-4">
                <div className="card shadow-lg">
                  <div className="position-relative">
                    <img
                      src={partido.imagen}
                      className="card-img-top"
                      alt="Cancha de fútbol"
                      style={{ height: "200px", objectFit: "cover" }}
                    />

                    {/* Botón Ver Detalles en la esquina superior derecha */}
                    <Link
                      to={`/partidos/${partido._id}`}
                      className="btn btn-sm fw-bold position-absolute"
                      style={{
                        top: "10px",
                        right: "10px",
                        background: "rgba(39, 174, 96, 0.85)", // Verde con transparencia
                        color: "white",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "14px",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => (e.target.style.background = "rgba(39, 174, 96, 1)")}
                      onMouseLeave={(e) => (e.target.style.background = "rgba(39, 174, 96, 0.85)")}
                    >
                      🔍 Ver Detalles
                    </Link>
                    {/* Estado (Reservado o Disponible) debajo del botón */}
                    <span
                      className="position-absolute text-white fw-bold text-uppercase px-3 py-1"
                      style={{
                        top: "50px", // Justo debajo del botón
                        right: "10px",
                        borderRadius: "6px",
                        background: partido.estado === "Reservado" ? "#145a32" : "#c0392b", // Verde oscuro o Rojo
                      }}
                    >
                      {partido.estado === "Reservado" ? "Reservado" : "NO Reservado"}
                    </span>
                  </div>


                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      {new Date(partido.fecha).toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}{" "}
                      - {new Date(partido.fecha).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h5>
                    <p className="card-text">
                      <strong>Tipo:</strong> {partido.tipo} <br />
                      <strong>Confirmados:</strong>{" "}
                      {partido.confirmados.length}/
                      {partido.totalJugadores}
                    </p>

                    {/* Botón Sumarse/Bajarse */}
                    <button
                      className={`btn w-100 mt-3 fw-bold ${estaLleno ? "btn-danger" : confirmados[partido.id] ? "btn-danger" : "btn-success"}`}
                      onClick={() => {
                        if (!estaLleno) {
                          handleAbrirModal(partido)
                        }
                      }}
                      disabled={estaLleno} // Evita que se pueda hacer clic si está lleno
                    >
                      {estaLleno ? "🚫 ESTAMOS" : "✅ Sumarme"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
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
        {/* Botón Agregar Partido */}
        {/* <div className="col-md-8 text-center">
          {/* <button className="btn btn-success btn-lg fw-bold w-100">
            ➕ Agregar Partido
          // </button> */}
          <CrearPartidoModal onPartidoCreado={() => setRefresh(!refresh)} />
        {/* </div> */}
      </div>
    </div>
  );
}

export default PartidosList;
