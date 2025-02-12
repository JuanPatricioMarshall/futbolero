import React, { useState, useEffect } from "react";
import { Carousel, Card } from "react-bootstrap";
import JugadoresCarrusel from "../components/JugadoresCarrusel";

const jugadoresMock = [
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 3,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 1,
    nombre: "Lionel Messi",
    edad: 36,
    foto: "assets/images/kiman_jugador.jpg",
    general: 5,
    stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
  },
  {
    id: 2,
    nombre: "Cristiano Ronaldo",
    edad: 39,
    foto: "https://via.placeholder.com/150",
    general: 5,
    stats: { ataque: 5, defensa: 4, velocidad: 4, potencia: 5, estamina: 4, pases: 4 },
  },
];

const Jugadores = () => {
    const [jugadores, setJugadores] = useState([]);
  
    useEffect(() => {
      // Aquí puedes hacer fetch a la API si tienes un backend
      setJugadores(jugadoresMock);
    }, []);
  
    return (
      <div className="container mt-4">
        <h2 className="text-center">Jugadores Destacados</h2>
        <JugadoresCarrusel jugadores={jugadores} />
      </div>
    );
  };
  
  export default Jugadores;