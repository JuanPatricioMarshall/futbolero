const mongoose = require("mongoose");

const JugadorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apodo: { type: String },
    apellido: { type: String },
    edad: { type: Number },
    stat_general: { type: Number, required: true, min: 1, max: 99 },
    stat_ataque: { type: Number, required: true, min: 1, max: 99 },
    stat_defensa: { type: Number, required: true, min: 1, max: 99 },
    stat_velocidad: { type: Number, required: true, min: 1, max: 99 },
    stat_stamina: { type: Number, required: true, min: 1, max: 99 },
    stat_potencia: { type: Number, required: true, min: 1, max: 99 },
    stat_pase: { type: Number, required: true, min: 1, max: 99 },
    victorias: { type: Number, default: 0 },
    empates: { type: Number, default: 0 },
    derrotas: { type: Number, default: 0 },
    foto: { type: String, required: true }
});

// Exportamos el modelo
module.exports = mongoose.model("Jugador", JugadorSchema);
