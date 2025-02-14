import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import "./JugadorCardDrag.css"; // Archivo de estilos

const JugadorCardDrag = ({ jugador }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => setIsFlipped(!isFlipped);

    const dataRadar = {
        labels: ["ATK", "DEF", "VEL", "POT", "STA", "PASS"],
        datasets: [
            {
                label: "Stats",
                data: [
                    jugador.stat_ataque || 0,
                    jugador.stat_defensa || 0,
                    jugador.stat_velocidad || 0,
                    jugador.stat_potencia || 0,
                    jugador.stat_stamina || 0,
                    jugador.stat_pase || 0
                ],
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderColor: "#007BFF",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className={`jugador-card-drag ${isFlipped ? "flipped" : ""}`} onClick={toggleFlip}>
            <div className="jugador-card-inner">
                {/* Frente de la carta */}
                <div className="jugador-card-front">
                    <img src={jugador.foto} alt={jugador.nombre} />
                    <p>{jugador.nombre}</p>
                </div>

                {/* Dorso con Stats */}
                <div className="jugador-card-back">
                    <h5>{jugador.nombre}</h5>
                    <div className="hexagono">
                        <Radar
                            data={dataRadar}
                            options={{
                                maintainAspectRatio: false,
                                responsive: true,
                                plugins: { legend: { display: false } },
                                scales: {
                                    r: {
                                        min: 0,
                                        max: 99,
                                        ticks: { display: false },
                                        grid: { color: "rgba(0, 0, 0, 0.2)" }, // Mejor contraste
                                        pointLabels: {
                                            font: { size: 10, weight: "bold" }, // Letras más grandes y legibles
                                            color: "#333",
                                        }
                                    }
                                }
                            }}
                            style={{ width: "100px", height: "100px", background: "white" }}
                        />

                        {/* <Radar
                            data={dataRadar}
                            options={{
                                maintainAspectRatio: false,
                                responsive: true,
                                plugins: { legend: { display: false } },
                                scales: {
                                    r: {
                                        min: 0, max: 99,
                                        ticks: { display: false },
                                        grid: { color: "rgba(0, 0, 0, 0.1)" },
                                        pointLabels: { font: { size: 10 } }
                                    }
                                }
                            }}
                            style={{ width: "100px", height: "100px" }} // Forzar tamaño
                        /> */}
                        {/* <Radar data={dataRadar} options={{
                            plugins: { legend: { display: false } },
                            scales: {
                                r: {
                                    min: 0, max: 99,
                                    ticks: { display: false },
                                    grid: { color: "rgba(0, 0, 0, 0.1)" },
                                    pointLabels: { font: { size: 14 } }
                                }
                            }
                        }} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JugadorCardDrag;
