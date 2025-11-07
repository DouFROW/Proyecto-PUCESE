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
  host: "localhost",
  port: 3307,
  user: "user", // <-- Cambia según tu usuario de MySQL
  password: "userpassword", // <-- Agrega tu contraseña si tienes una
  database: "aetpuce_db", // <-- Base de datos creada en Workbench
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

app.post("/socios", (req, res) => {
  const {
    codigo_socio,
    nombre,
    apellido,
    cedula,
    direccion,
    departamento,
    fecha_ingreso,
    nombre_banco,
    numero_cuenta,
    salario,
    email,
    telefono,
  } = req.body;

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
      fecha_ingreso,
      nombre_banco,
      numero_cuenta,
      salario,
      email,
      telefono,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al guardar socio");
      } else {
        res.status(201).send("Socio agregado exitosamente");
      }
    }
  );
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
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
