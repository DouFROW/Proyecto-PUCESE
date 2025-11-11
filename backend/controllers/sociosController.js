// backend/controllers/sociosController.js
const SocioModel = require("../models/socioModel");
const generarCodigoSocio = require("../utils/codigoGenerator");

const sociosController = {
  // Crear nuevo socio
  crear: async (req, res) => {
    console.log("📥 POST /socios - Recibiendo datos:", req.body);

    try {
      const {
        nombre,
        apellido,
        cedula,
        direccion,
        departamento,
        fechaIngreso,
        nombrebank,
        numerodecuenta,
        tipodecuenta,
        email,
        telefono,
      } = req.body;

      // Validar campos requeridos
      if (!nombre || !apellido || !cedula || !email || !departamento) {
        return res.status(400).json({
          error: "Faltan campos requeridos",
          campos_faltantes: {
            nombre: !nombre,
            apellido: !apellido,
            cedula: !cedula,
            email: !email,
            departamento: !departamento,
          },
        });
      }

      // Verificar si la cédula ya existe
      const cedulaExiste = await SocioModel.verificarCedula(cedula);
      if (cedulaExiste) {
        return res.status(400).json({ error: "La cédula ya está registrada" });
      }

      // Generar código de socio
      const codigo_socio = await generarCodigoSocio();

      // Insertar socio
      const result = await SocioModel.crear({
        codigo_socio,
        nombre,
        apellido,
        cedula,
        direccion,
        departamento,
        fechaIngreso,
        nombrebank,
        numerodecuenta,
        tipodecuenta,
        email,
        telefono,
      });

      console.log(`✅ Socio agregado exitosamente: ${codigo_socio}`);
      res.status(201).json({
        message: "Socio agregado exitosamente",
        codigo_socio: codigo_socio,
        id: result.insertId,
      });
    } catch (error) {
      console.error("❌ Error en POST /socios:", error);
      res.status(500).json({
        error: "Error al procesar la solicitud",
        details: error.message,
      });
    }
  },

  // Obtener todos los socios
  obtenerTodos: async (req, res) => {
    console.log("📡 GET /socios - Obteniendo todos los socios...");

    try {
      const socios = await SocioModel.obtenerTodos();
      console.log(`✅ Socios obtenidos: ${socios.length}`);
      res.json(socios);
    } catch (error) {
      console.error("❌ Error al obtener socios:", error);
      res.status(500).json({
        error: "Error al obtener socios",
        details: error.message,
      });
    }
  },

  // Obtener socios activos
  obtenerActivos: async (req, res) => {
    console.log("📡 GET /socios/activos");

    try {
      const socios = await SocioModel.obtenerActivos();
      console.log(`✅ Socios activos obtenidos: ${socios.length}`);
      res.json(socios);
    } catch (error) {
      console.error("❌ Error al obtener socios activos:", error);
      res.status(500).json({
        error: "Error al obtener socios",
        details: error.message,
      });
    }
  },

  // Obtener socio por ID
  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    console.log(`📡 GET /socios/${id}`);

    try {
      const socio = await SocioModel.obtenerPorId(id);
      if (!socio) {
        return res.status(404).json({ error: "Socio no encontrado" });
      }
      res.json(socio);
    } catch (error) {
      console.error("❌ Error al obtener socio:", error);
      res.status(500).json({ error: "Error al obtener socio" });
    }
  },

  // Actualizar socio
  actualizar: async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    console.log(`📡 PUT /socios/${id}`, datos);

    try {
      const result = await SocioModel.actualizar(id, datos);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Socio no encontrado" });
      }

      console.log(`✅ Socio ${id} actualizado`);
      res.json({ message: "Socio actualizado exitosamente" });
    } catch (error) {
      console.error("❌ Error al actualizar socio:", error);
      res.status(500).json({ error: "Error al actualizar socio" });
    }
  },

  // Desactivar socio
  desactivar: async (req, res) => {
    const { id } = req.params;
    console.log(`📡 PUT /socios/desactivar/${id}`);

    try {
      const result = await SocioModel.desactivar(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Socio no encontrado" });
      }

      console.log(`✅ Socio ${id} desactivado`);
      res.json({ message: "Socio desactivado exitosamente" });
    } catch (error) {
      console.error("❌ Error al desactivar socio:", error);
      res.status(500).json({
        error: "Error al desactivar socio",
        details: error.message,
      });
    }
  },

  // Activar socio
  activar: async (req, res) => {
    const { id } = req.params;
    console.log(`📡 PUT /socios/activar/${id}`);

    try {
      const result = await SocioModel.activar(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Socio no encontrado" });
      }

      console.log(`✅ Socio ${id} activado`);
      res.json({ message: "Socio activado exitosamente" });
    } catch (error) {
      console.error("❌ Error al activar socio:", error);
      res.status(500).json({
        error: "Error al activar socio",
        details: error.message,
      });
    }
  },

  // Eliminar socio
  eliminar: async (req, res) => {
    const { id } = req.params;
    console.log(`📡 DELETE /socios/${id}`);

    try {
      const result = await SocioModel.eliminar(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Socio no encontrado" });
      }

      console.log(`✅ Socio ${id} eliminado`);
      res.json({ message: "Socio eliminado exitosamente" });
    } catch (error) {
      console.error("❌ Error al eliminar socio:", error);
      res.status(500).json({ error: "Error al eliminar socio" });
    }
  },
};

module.exports = sociosController;
