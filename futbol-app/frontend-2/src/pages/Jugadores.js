import React, { useState, useEffect } from "react";
import { Carousel, Card } from "react-bootstrap";
import JugadoresCarrusel from "../components/JugadoresCarrusel";
import axios from "axios";


const Jugadores = () => {
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/jugadores`)
            .then((response) => {
                setJugadores(response.data); // Guardar los partidos en el estado
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los jugadores:", error);
                setError("No se pudieron cargar los jugadores.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center">Cargando jugadores...</div>;
    if (error) return <div className="text-danger text-center">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="text-center">Toxo jugadores</h2>
            <JugadoresCarrusel jugadores={jugadores} />
        </div>
    );
};

export default Jugadores;