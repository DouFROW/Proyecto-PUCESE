// Importar dependencias
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión con MySQL (Docker)
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "userpassword",
  database: process.env.DB_NAME || "my_database",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// Generar código de socio automático
const generarCodigoSocio = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT COUNT(*) as total FROM socios", (err, result) => {
      if (err) reject(err);
      const numero = result[0].total + 1;
      const codigo = `AET-${String(numero).padStart(4, "0")}`;
      resolve(codigo);
    });
  });
};

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

    // Generar código de socio automáticamente
    const codigo_socio = await generarCodigoSocio();

    const sql = `
      INSERT INTO socios
      (codigo_socio, nombre, apellido, cedula, direccion, departamento,
       fecha_ingreso, nombre_banco, numero_cuenta, salario, email, telefono)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
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
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          if (err.code === "ER_DUP_ENTRY") {
            res.status(400).json({ error: "La cédula ya está registrada" });
          } else {
            res.status(500).json({ error: "Error al guardar socio" });
          }
        } else {
          res.status(201).json({
            message: "Socio agregado exitosamente",
            codigo_socio: codigo_socio,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

app.get("/socios/activos", (req, res) => {
  const sql = "SELECT * FROM socios WHERE estado = 'Activo'";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error al obtener socios");
    } else {
      res.json(results);
    }
  });
});

app.put("/socios/desactivar/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE socios SET estado = 'Inactivo' WHERE id_socio = ?";
  db.query(sql, [id], (err) => {
    if (err) res.status(500).send("Error al desactivar socio");
    else res.send("Socio desactivado");
  });
});

app.put("/socios/activar/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE socios SET estado = 'Activo' WHERE id_socio = ?";
  db.query(sql, [id], (err) => {
    if (err) res.status(500).send("Error al activar socio");
    else res.send("Socio activado");
  });
});

app.get("/socios", (req, res) => {
  db.query("SELECT * FROM socios", (err, results) => {
    if (err) res.status(500).send("Error al obtener socios");
    else res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
