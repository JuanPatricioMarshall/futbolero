const mongoose = require("mongoose");

const PartidoSchema = new mongoose.Schema({
  fecha: { type: String, required: true }, // Ej: "2025-02-15"
  diaSemana: { type: String, required: true }, // Ej: "Sábado"
  hora: { type: String, required: true }, // Ej: "18:00"
  confirmados: [{ type: String }], // Lista de jugadores confirmados
  tipo: { type: String, enum: ["Futbol_5", "Futbol_7"], required: true }, // Tipo de partido
  totalJugadores: { type: Number, required: true }, // Ej: 10 o 14
  estado: { type: String, enum: ["Disponible", "Reservado", "ParaReservar", "Abierto"], default: "Disponible" },
  lugar: { type: String, required: true }, // Dirección de la cancha
  imagen: { type: String, required: true } // URL de la imagen
}, { timestamps: true });

module.exports = mongoose.model("Partido", PartidoSchema);
