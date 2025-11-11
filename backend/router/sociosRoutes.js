// backend/routes/sociosRoutes.js
const express = require("express");
const router = express.Router();
const sociosController = require("../controllers/sociosController");

// Rutas para socios
router.post("/", sociosController.crear);
router.get("/", sociosController.obtenerTodos);
router.get("/activos", sociosController.obtenerActivos);
router.get("/:id", sociosController.obtenerPorId);
router.put("/:id", sociosController.actualizar);
router.put("/desactivar/:id", sociosController.desactivar);
router.put("/activar/:id", sociosController.activar);
router.delete("/:id", sociosController.eliminar);

module.exports = router;
