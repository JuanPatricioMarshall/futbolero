const express = require("express");
const router = express.Router();
const Jugador = require("../models/Jugador"); // Importamos el modelo de MongoDB

// Mock de jugadores (por ahora)
const jugadores = [
    {
        id: 1,
        nombre: "KIMAN",
        edad: 36,
        foto: "/assets/images/kiman_jugador.jpg",
        general: 2,
        historial: { W: 1, D: 5, L: 24 },
        stats: { ataque: 1, defensa: 1, velocidad: 0, potencia: 1, estamina: 1, pases: 1 },
    },
    {
        id: 2,
        nombre: "RAUL",
        edad: 28,
        foto: "/assets/images/lauti_jugador.jpg",
        general: 4,
        historial: { W: 20, D: 0, L: 0 },
        stats: { ataque: 5, defensa: 5, velocidad: 4, potencia: 5, estamina: 1, pases: 5 },
    },
];

// Obtener todos los jugadores
router.get("/", async (req, res) => {
    try {
        const jugadores = await Jugador.find();
        res.json(jugadores);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo jugadores" });
    }
});


// Obtener un jugador por ID
router.get("/:id", async (req, res) => {
    try {
        const jugador = await Jugador.findById(req.params.id);
        if (!jugador) return res.status(404).json({ error: "Jugador no encontrado" });
        res.json(jugador);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo jugador" });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevoJugador = new Jugador(req.body);
        await nuevoJugador.save();
        res.status(201).json(nuevoJugador);
    } catch (error) {
        res.status(400).json({ error: "Error al crear jugador" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const jugadorActualizado = await Jugador.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!jugadorActualizado) return res.status(404).json({ error: "Jugador no encontrado" });
        res.json(jugadorActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando jugador" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const jugadorEliminado = await Jugador.findByIdAndDelete(req.params.id);
        if (!jugadorEliminado) return res.status(404).json({ error: "Jugador no encontrado" });
        res.json({ message: "Jugador eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando jugador" });
    }
});

module.exports = router;
