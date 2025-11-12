const Prestamo = require("../models/prestamoModel");

// Obtener todas las solicitudes
exports.obtenerPrestamos = (req, res) => {
  Prestamo.obtenerTodos((err, resultados) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener préstamos" });
    }
    res.json(resultados);
  });
};

// Crear una nueva solicitud
exports.crearPrestamo = (req, res) => {
  const nuevaSolicitud = req.body;

  Prestamo.crear(nuevaSolicitud, (err, resultado) => {
    if (err) {
      console.error("Error al crear préstamo:", err);
      return res.status(500).json({ error: "Error al crear el préstamo" });
    }
    res.status(201).json({ message: "Solicitud registrada exitosamente" });
  });
};
