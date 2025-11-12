const express = require("express");
const router = express.Router();
const prestamoController = require("../controllers/prestamoController");

// Obtener todos los préstamos
router.get("/", prestamoController.obtenerPrestamos);

// Crear un nuevo préstamo
router.post("/", prestamoController.crearPrestamo);

module.exports = router;
