import React, { useState } from "react";
import { FaStar, FaRegStar, FaSearch } from "react-icons/fa"; // 👈 Importamos la lupa


import { useNavigate } from "react-router-dom"; // 👈 Importar useNavigate
import "./JugadorCard.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 3, // Muestra 3 cartas en pantallas grandes
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 2, // Muestra 2 cartas en pantallas medianas
    },
    tablet: {
        breakpoint: { max: 768, min: 464 },
        items: 1, // Muestra 1 carta en pantallas pequeñas
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const mapearStat = (valor) => Math.round((valor / 99) * 5); // Redondeo entero

const renderStars = (rating) => {
    const totalStars = 5; // Siempre mostrar 5 estrellas
    const mappedRating = Math.round(mapearStat(rating)); // Asegurar redondeo
    return (
        <>
            {Array.from({ length: totalStars }, (_, index) =>
                index < mappedRating ? (
                    <FaStar key={index} color="gold" />
                ) : (
                    <FaRegStar key={index} color="gray" />
                )
            )}
        </>
    );
};



const JugadorCard = ({ jugador }) => {
    const [volteado, setVolteado] = useState(false);
    const navigate = useNavigate(); // 👈 Hook para navegar a otra página

    const handleVerMasInfo = (e) => {
        e.stopPropagation(); // 👈 Evita que se voltee la carta al hacer clic en la lupa
        navigate(`/jugador/${jugador._id}`);
    };

    return (
        <div
            className={`jugador-card ${volteado ? "volteado" : ""}`}
            onClick={() => setVolteado(!volteado)}
        >
            {!volteado ? (
                <div className="frontal">
                    <div className="lupa-icono" onClick={handleVerMasInfo}>
                        <FaSearch />
                    </div>
                    <img src={jugador.foto} alt={jugador.nombre} className="jugador-foto" />
                    <h3 className="jugador-nombre">{jugador.nombre}</h3>
                    <div className="estrellas">{renderStars(jugador.stat_general)}</div>
                </div>
            ) : (


                <div className="jugador-carta-back">
                    <div className="jugador-info">Edad: {jugador.edad}</div>

                    <div className="jugador-stats">
                        {[
                            { nombre: "Ataque", valor: jugador.stat_ataque },
                            { nombre: "Defensa", valor: jugador.stat_defensa },
                            { nombre: "Velocidad", valor: jugador.stat_velocidad },
                            { nombre: "Potencia", valor: jugador.stat_potencia },
                            { nombre: "Estamina", valor: jugador.stat_stamina },
                            { nombre: "Pases", valor: jugador.stat_pases }
                        ].map((stat) => (
                            <div key={stat.nombre} className="jugador-stat">
                                <span className="stat-nombre">{stat.nombre}</span>
                                <div className="stat-estrellas">{renderStars(stat.valor)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const JugadoresCarrusel = ({ jugadores }) => {
    return (
        <div className="carrusel-container">
            <Carousel containerClass="custom-carousel" responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
                {jugadores.map((jugador, index) => (
                    <JugadorCard key={index} jugador={jugador} />
                ))}
            </Carousel>
        </div>
    );
};

export default JugadoresCarrusel;
