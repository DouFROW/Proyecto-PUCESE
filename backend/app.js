// backend/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importar rutas
const sociosRoutes = require("./router/sociosRoutes");
const prestamoRoutes = require("./router/prestamoRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas principales
app.use("/socios", sociosRoutes);
app.use("/prestamos", prestamoRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API AETPUCE funcionando correctamente",
    version: "1.0.0",
    endpoints: {
      socios: "GET /socios - Obtener todos los socios",
      prestamos: "GET /prestamos - Obtener todos los préstamos",
      agregarPrestamo: "POST /prestamos - Crear un nuevo préstamo",
    },
  });
});

// 404
app.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;
