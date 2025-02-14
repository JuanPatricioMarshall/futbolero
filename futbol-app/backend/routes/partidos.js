const express = require("express");
const router = express.Router();
const Partido = require("../models/Partido");
const Jugador = require("../models/Jugador");

// Simulación de base de datos


router.get("/proximos", async (req, res) => {
    try {
        const partidos = await Partido.find()
        partidos.
            sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Ordenados por fecha;
        res.json(partidos);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los partidos" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const partido = await Partido.findById(req.params.id);
        if (!partido) return res.status(404).json({ error: "Partido no encontrado" });
        res.json(partido);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener el partido" });
    }
});

// Crear un nuevo partido
router.post("/", async (req, res) => {
    try {
        const nuevoPartido = new Partido(req.body);
        console.log(req)
        console.log(nuevoPartido)

        await nuevoPartido.save();
        res.status(201).json(nuevoPartido);
    } catch (err) {
        res.status(400).json({ error: "Error al crear el partido" });
    }
});

// Agregar jugador al partido
router.post("/:id/jugadores/:jugador_id", async (req, res) => {
    try {
        const partido = await Partido.findById(req.params.id);
        if (!partido) return res.status(404).json({ error: "Partido no encontrado" });

        jugador_id = req.params.jugador_id
        const jugador = await Jugador.findById(jugador_id);

        if (!jugador) return res.status(404).json({ error: "Jugador no encontrado" });

        if (partido.confirmados.includes(jugador_id)) {
            return res.status(400).json({ message: "El jugador ya está en el partido" });
        }

        partido.confirmados.push(jugador_id);

        if (partido.confirmados.length >= partido.totalJugadores && partido.estado != "Reservado") {
            partido.estado = "ParaReservar"; // Si se llenó, cambiar estado
        }

        await partido.save();
        res.json(partido);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error al agregar jugador" });
    }
});

// Bajar jugador del partido
router.delete("/:id/jugadores/:jugador_id", async (req, res) => {
    try {
        const partido = await Partido.findById(req.params.id);
        if (!partido) return res.status(404).json({ error: "Partido no encontrado" });

        const jugador_id = req.params.jugador_id;

        const jugador = await Jugador.findById(jugador_id);

        if (!jugador) return res.status(404).json({ error: "Jugador no encontrado" });

        // Verificar si el jugador está en la lista de confirmados
        if (!partido.confirmados.includes(jugador_id)) {
            return res.status(400).json({ message: "El jugador no está en el partido" });
        }

        // Eliminar al jugador del array de confirmados
        partido.confirmados = partido.confirmados.filter(id => id.toString() !== jugador_id);

        // Si el estado era "ParaReservar" y ahora hay menos jugadores, volver a "Abierto"
        if (partido.estado === "ParaReservar" && partido.confirmados.length < partido.totalJugadores) {
            partido.estado = "Abierto";
        }

        await partido.save();
        res.json({ message: "Jugador dado de baja", partido });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al dar de baja al jugador" });
    }
});



// Eliminar un partido
router.delete("/:id", async (req, res) => {
    try {
        const partido = await Partido.findByIdAndDelete(req.params.id);
        if (!partido) return res.status(404).json({ error: "Partido no encontrado" });
        res.json({ message: "Partido eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar el partido" });
    }
});




module.exports = router;
