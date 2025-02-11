const express = require("express");
const router = express.Router();
const Partido = require("../models/Partido");

// Simulación de base de datos
const partidos = [
    {
        id: 1,
        fecha: "2025-02-16T20:00:00",
        tipo: "Futbol_5",
        lugar: "Marangoni",
        confirmados: 8,
        totalJugadores: 10,
        estado: "Reservado",
        imagen: "assets/images/marangoni_cancha_1.jpg",
        confirmados: ["Juampa", "Kiman"]
    },
    {
        id: 2,
        fecha: "2025-02-17T18:30:00",
        tipo: "Fútbol 7",
        lugar: "Cancha 2",
        confirmados: [
            {
                nombre: "Kiman"
            }
        ],
        totalJugadores: 1,
        estado: "Disponible",
        imagen: "/assets/images/golazo_cancha_1.jpg",
    },
];

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
router.post("/:id/jugadores", async (req, res) => {
    try {
      const partido = await Partido.findById(req.params.id);

      if (!partido) return res.status(404).json({ error: "Partido no encontrado" });
  
      if (partido.confirmados.length >= partido.totalJugadores) {
        return res.status(400).json({ error: "El partido ya está lleno" });
      }
      partido.confirmados.push(req.body.jugador);
      if (partido.confirmados.length >= partido.totalJugadores && partido.estado != "Reservado") {
        partido.estado = "ParaReservar"; // Si se llenó, cambiar estado
      }
  
      await partido.save();
      res.json(partido);
    } catch (err) {
      res.status(500).json({ error: "Error al agregar jugador" });
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

// // Endpoint para obtener los próximos partidos
// router.get("/proximos", (req, res) => {
//     const ahora = new Date(); // Fecha actual
//     const partidosFuturos = partidos
//         .filter((p) => new Date(p.fecha) > ahora) // Solo partidos en el futuro
//         .sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Ordenados por fecha

//     res.json(partidosFuturos);
// });

router.get("/1", (req, res) => {
    res.json(partidos[0])
})

router.post("/1/jugadores", (req, res) => {
    console.log(req.body.jugador)
    return res.json(partidos[0])
})

module.exports = router;
