// Importar dependencias
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión con MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "userpassword",
  database: process.env.DB_NAME || "my_database",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL");
    // Verificar que la tabla existe
    db.query("SHOW TABLES LIKE 'socios'", (err, result) => {
      if (err) {
        console.error("Error verificando tabla:", err);
      } else if (result.length === 0) {
        console.error("⚠️ La tabla 'socios' no existe!");
      } else {
        console.log("✅ Tabla 'socios' encontrada");
        // Mostrar estructura de la tabla
        db.query("DESCRIBE socios", (err, structure) => {
          if (!err) {
            console.log("📋 Estructura de la tabla socios:");
            console.table(structure);
          }
        });
      }
    });
  }
});

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

// Generar código de socio automático
const generarCodigoSocio = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) as total FROM socios", (err, result) => {
      if (err) {
        console.error("Error al contar socios:", err);
        reject(err);
      } else {
        const numero = result[0].total + 1;
        const codigo = `AET-${String(numero).padStart(4, "0")}`;
        console.log(`📝 Código generado: ${codigo}`);
        resolve(codigo);
      }
    });
  });
};

// POST - Agregar socio
app.post("/socios", async (req, res) => {
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
    db.query(
      "SELECT cedula FROM socios WHERE cedula = ?",
      [cedula],
      async (err, result) => {
        if (err) {
          console.error("Error al verificar cédula:", err);
          return res.status(500).json({ error: "Error al verificar cédula" });
        }

        if (result.length > 0) {
          return res
            .status(400)
            .json({ error: "La cédula ya está registrada" });
        }

        // Generar código de socio
        const codigo_socio = await generarCodigoSocio();

        // Insertar socio
        const sql = `
        INSERT INTO socios
        (codigo_socio, nombre, apellido, cedula, direccion, departamento,
         fecha_ingreso, nombre_banco, numero_cuenta, tipo_cuenta, email, telefono, estado, salario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo', 0)
      `;

        const valores = [
          codigo_socio,
          nombre,
          apellido,
          cedula,
          direccion || null,
          departamento,
          fechaIngreso,
          nombrebank || null,
          numerodecuenta || null,
          tipodecuenta || null,
          email,
          telefono || null,
        ];

        console.log("💾 Insertando socio con valores:", valores);

        db.query(sql, valores, (err, result) => {
          if (err) {
            console.error("❌ Error al insertar socio:", err);
            return res.status(500).json({
              error: "Error al guardar socio",
              details: err.message,
            });
          }

          console.log(`✅ Socio agregado exitosamente: ${codigo_socio}`);
          res.status(201).json({
            message: "Socio agregado exitosamente",
            codigo_socio: codigo_socio,
            id: result.insertId,
          });
        });
      }
    );
  } catch (error) {
    console.error("❌ Error en POST /socios:", error);
    res.status(500).json({
      error: "Error al procesar la solicitud",
      details: error.message,
    });
  }
});

// GET - Obtener todos los socios
app.get("/socios", (req, res) => {
  console.log("📡 GET /socios - Obteniendo todos los socios...");

  const sql = "SELECT * FROM socios ORDER BY fecha_ingreso DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener socios:", err);
      res.status(500).json({
        error: "Error al obtener socios",
        details: err.message,
      });
    } else {
      console.log(`✅ Socios obtenidos: ${results.length}`);
      res.json(results);
    }
  });
});

// GET - Obtener socios activos
app.get("/socios/activos", (req, res) => {
  console.log("📡 GET /socios/activos");

  const sql =
    "SELECT * FROM socios WHERE estado = 'Activo' ORDER BY fecha_ingreso DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener socios activos:", err);
      res.status(500).json({
        error: "Error al obtener socios",
        details: err.message,
      });
    } else {
      console.log(`✅ Socios activos obtenidos: ${results.length}`);
      res.json(results);
    }
  });
});

// GET - Obtener un socio por ID
app.get("/socios/:id", (req, res) => {
  const { id } = req.params;
  console.log(`📡 GET /socios/${id}`);

  const sql = "SELECT * FROM socios WHERE id_socio = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener socio:", err);
      return res.status(500).json({ error: "Error al obtener socio" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Socio no encontrado" });
    }

    res.json(results[0]);
  });
});

// PUT - Desactivar socio
app.put("/socios/desactivar/:id", (req, res) => {
  const { id } = req.params;
  console.log(`📡 PUT /socios/desactivar/${id}`);

  const sql = "UPDATE socios SET estado = 'Inactivo' WHERE id_socio = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error al desactivar socio:", err);
      res.status(500).json({
        error: "Error al desactivar socio",
        details: err.message,
      });
    } else {
      console.log(`✅ Socio ${id} desactivado`);
      res.json({ message: "Socio desactivado exitosamente" });
    }
  });
});

// PUT - Activar socio
app.put("/socios/activar/:id", (req, res) => {
  const { id } = req.params;
  console.log(`📡 PUT /socios/activar/${id}`);

  const sql = "UPDATE socios SET estado = 'Activo' WHERE id_socio = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error al activar socio:", err);
      res.status(500).json({
        error: "Error al activar socio",
        details: err.message,
      });
    } else {
      console.log(`✅ Socio ${id} activado`);
      res.json({ message: "Socio activado exitosamente" });
    }
  });
});

// PUT - Actualizar socio
app.put("/socios/:id", (req, res) => {
  const { id } = req.params;
  const datos = req.body;

  console.log(`📡 PUT /socios/${id}`, datos);

  // Construir query dinámicamente basado en los campos enviados
  const campos = Object.keys(datos)
    .map((key) => `${key} = ?`)
    .join(", ");
  const valores = [...Object.values(datos), id];

  const sql = `UPDATE socios SET ${campos} WHERE id_socio = ?`;

  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error("❌ Error al actualizar socio:", err);
      return res.status(500).json({ error: "Error al actualizar socio" });
    }

    console.log(`✅ Socio ${id} actualizado`);
    res.json({ message: "Socio actualizado exitosamente" });
  });
});

// DELETE - Eliminar socio (uso con precaución)
app.delete("/socios/:id", (req, res) => {
  const { id } = req.params;
  console.log(`📡 DELETE /socios/${id}`);

  const sql = "DELETE FROM socios WHERE id_socio = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error al eliminar socio:", err);
      return res.status(500).json({ error: "Error al eliminar socio" });
    }

    console.log(`✅ Socio ${id} eliminado`);
    res.json({ message: "Socio eliminado exitosamente" });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🚀 Servidor AETPUCE corriendo      ║
║   📍 http://localhost:${PORT}           ║
║   ✅ Listo para recibir peticiones   ║
╚═══════════════════════════════════════╝
  `);
});
