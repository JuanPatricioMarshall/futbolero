require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors()); // Habilita CORS para el frontend
app.use(express.json()); // Permite recibir JSON en requests


// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

const partidosRoutes = require("./routes/partidos");
app.use("/api/partidos", partidosRoutes); // Prefijo para las rutas de partidos

const jugadoresRoutes = require("./routes/jugadores");
app.use("/api/jugadores", jugadoresRoutes); // Montar la ruta


app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
