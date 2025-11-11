// backend/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importar rutas
const sociosRoutes = require("./routes/sociosRoutes");

// Inicializar Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/socios", sociosRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API AETPUCE funcionando correctamente",
    version: "1.0.0",
    endpoints: {
      socios: "GET /socios - Obtener todos los socios",
      sociosActivos: "GET /socios/activos - Obtener socios activos",
      agregarSocio: "POST /socios - Agregar un nuevo socio",
      desactivarSocio: "PUT /socios/desactivar/:id - Desactivar un socio",
      activarSocio: "PUT /socios/activar/:id - Activar un socio",
    },
  });
});

// Manejo de errores 404
app.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;
