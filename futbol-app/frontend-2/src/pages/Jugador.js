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
        // Simulación de fetch, luego reemplazar con un API call real
        const jugadorMock = {
            id: 1,
            nombre: "KIMAN",
            edad: 36,
            foto: "/assets/images/kiman_jugador.jpg",
            general: 3,
            stats: { ataque: 5, defensa: 3, velocidad: 5, potencia: 4, estamina: 4, pases: 5 },
            historial: { W: 13, D: 2, L: 24 }
        };

        // Simulación de delay como si fuera un fetch
        setTimeout(() => {
            setJugador(jugadorMock);
        }, 500);
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
                data: Object.values(jugador.stats),
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
                max: 5,
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
    const calcularPorcentajes = (historial) => {
        const total = historial.W + historial.D + historial.L;
        return {
            win: (historial.W / total) * 100,
            draw: (historial.D / total) * 100,
            loss: (historial.L / total) * 100,
        };
    };

    const { win, draw, loss } = calcularPorcentajes(jugador.historial);

    return (
        <div className="jugador-detalles">
            {/* Columna 1: Info del jugador */}
            <div className="jugador-info">
                <button className="boton-volver" onClick={() => navigate(-1)}>← Volver Atrás</button>
                <img src={jugador.foto} alt={jugador.nombre} className="jugador-foto" />
                <h2>{jugador.nombre}</h2>
                <p>Edad: {jugador.edad}</p>

                <div className="jugador-stats">
                    {Object.entries(jugador.stats).map(([key, value]) => (
                        <div key={key} className="stat-row">
                            <span className="stat-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <div className="stat-bar-container">
                                <div className="stat-bar" style={{ width: `${(value / 5) * 100}%` }}></div>
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
                    <p className="historial-record">{jugador.historial.W}W - {jugador.historial.D}D - {jugador.historial.L}L</p>
                    <p className="historial-winrate">Win Rate: {win.toFixed(1)}%</p>
                </div>
            </div>
        </div>
    );
};

export default Jugador;
