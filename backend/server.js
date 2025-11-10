// Importar dependencias
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// -----------------------------------------------------
// ✅ Conexión con MySQL (compatible con Docker y local)
// -----------------------------------------------------
let db;

const initDB = async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3307,
      user: process.env.DB_USER || "user",
      password: process.env.DB_PASSWORD || "userpassword",
      database: process.env.DB_NAME || "my_database",
    });
    console.log("✅ Conectado correctamente a MySQL");
  } catch (err) {
    console.error("❌ Error al conectar con MySQL:", err.message);
    // Si falla la conexión, reintenta después de 5 segundos
    setTimeout(initDB, 5000);
  }
};

initDB();

// -----------------------------------------------------
// ✅ Función auxiliar: Generar código de socio automático
// -----------------------------------------------------
const generarCodigoSocio = async () => {
  const [rows] = await db.query("SELECT COUNT(*) as total FROM socios");
  const numero = rows[0].total + 1;
  return `AET-${String(numero).padStart(4, "0")}`;
};

// -----------------------------------------------------
// ✅ Rutas del API
// -----------------------------------------------------

// Crear socio nuevo
app.post("/socios", async (req, res) => {
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

    const codigo_socio = await generarCodigoSocio();

    const sql = `
      INSERT INTO socios
      (codigo_socio, nombre, apellido, cedula, direccion, departamento,
       fecha_ingreso, nombre_banco, numero_cuenta, salario, email, telefono)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      codigo_socio,
      nombre,
      apellido,
      cedula,
      direccion,
      departamento,
      fechaIngreso,
      nombrebank,
      numerodecuenta,
      0,
      email,
      telefono,
    ]);

    res.status(201).json({
      message: "Socio agregado exitosamente",
      codigo_socio: codigo_socio,
    });
  } catch (err) {
    console.error("Error al guardar socio:", err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "La cédula ya está registrada" });
    } else {
      res.status(500).json({ error: "Error al guardar socio" });
    }
  }
});

// Obtener todos los socios
app.get("/socios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM socios");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Error al obtener socios");
  }
});

// Obtener solo los socios activos
app.get("/socios/activos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM socios WHERE estado = 'Activo'");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Error al obtener socios activos");
  }
});

// Desactivar socio
app.put("/socios/desactivar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE socios SET estado = 'Inactivo' WHERE id_socio = ?", [id]);
    res.send("Socio desactivado");
  } catch (err) {
    res.status(500).send("Error al desactivar socio");
  }
});

// Activar socio
app.put("/socios/activar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE socios SET estado = 'Activo' WHERE id_socio = ?", [id]);
    res.send("Socio activado");
  } catch (err) {
    res.status(500).send("Error al activar socio");
  }
});

// -----------------------------------------------------
// ✅ Puerto del servidor
// -----------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
