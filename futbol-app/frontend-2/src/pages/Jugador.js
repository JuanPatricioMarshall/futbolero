import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from "chart.js";
import { Radar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Jugador.css";

// Registrar los componentes necesarios
ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const Jugador = () => {
    const { id } = useParams(); // Obtiene el ID del jugador desde la URL
    const navigate = useNavigate();
    const [jugador, setJugador] = useState(null); // Ahora inicia en null para evitar errores de acceso

    useEffect(() => {
        const fetchJugador = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/jugadores/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener el jugador");
                }
                const data = await response.json();
                setJugador(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchJugador();
    }, [id]);


    // Muestra un mensaje de carga hasta que el jugador tenga datos
    if (!jugador) {
        return <p>Cargando...</p>;
    }

    // Configuración del gráfico Radar
    const dataRadar = {
        labels: ["Ataque", "Defensa", "Velocidad", "Potencia", "Estamina", "Pases"],
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

    const optionsRadar = {
        plugins: {
            legend: {
                display: false // Oculta la leyenda del gráfico
            }
        },
        scales: {
            r: {
                min: 0,
                max: 99,
                ticks: {
                    display: false // Oculta los números de escala
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.1)" // Ajusta el color de la rejilla si lo necesitas
                },
                pointLabels: {
                    font: {
                        size: 14 // Ajusta el tamaño de los textos en los ejes
                    }
                }
            }
        }
    };

    // Calcular porcentajes del historial
    const calcularPorcentajes = (jugador) => {
        const total = jugador.victorias + jugador.derrotas + jugador.empates;
        return {
            win: (jugador.victorias / total) * 100,
            draw: (jugador.empates / total) * 100,
            loss: (jugador.derrotas / total) * 100,
        };
    };

    const { win, draw, loss } = calcularPorcentajes(jugador);

    return (
        <div className="jugador-detalles">
            {/* Columna 1: Info del jugador */}
            <div className="jugador-info">
                <button className="boton-volver" onClick={() => navigate(-1)}>← Volver Atrás</button>
                <img src={jugador.foto} alt={jugador.nombre} className="jugador-foto" />
                <h2>{jugador.nombre}</h2>
                <p>Edad: {jugador.edad}</p>

                <div className="jugador-stats">
                    {[
                        { key: "stat_ataque", label: "Ataque", value: jugador.stat_ataque || 0 },
                        { key: "stat_defensa", label: "Defensa", value: jugador.stat_defensa || 0 },
                        { key: "stat_velocidad", label: "Velocidad", value: jugador.stat_velocidad || 0 },
                        { key: "stat_potencia", label: "Potencia", value: jugador.stat_potencia || 0 },
                        { key: "stat_stamina", label: "Estamina", value: jugador.stat_stamina || 0 },
                        { key: "stat_pase", label: "Pases", value: jugador.stat_pase || 0 }
                    ].map(({ key, label, value }) => (
                        <div key={key} className="stat-row">
                            <span className="stat-label">{label}</span>
                            <div className="stat-bar-container">
                                <div className="stat-bar" style={{ width: `${(value / 99) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Columna 2: Gráfico y Historial */}
            <div className="jugador-analisis">
                <div className="hexagono">
                    <Radar data={dataRadar} options={optionsRadar} />
                </div>
                <div className="historial-container">
                    <h3>Historial</h3>
                    <div className="historial-barra">
                        <div className="victorias" style={{ width: `${win}%` }}></div>
                        <div className="empates" style={{ width: `${draw}%` }}></div>
                        <div className="derrotas" style={{ width: `${loss}%` }}></div>
                    </div>
                    <p className="historial-record">{jugador.victorias}W - {jugador.empates}D - {jugador.derrotas}L</p>
                    <p className="historial-winrate">Win Rate: {win.toFixed(1)}%</p>
                </div>
            </div>
        </div>
    );
};

export default Jugador;
