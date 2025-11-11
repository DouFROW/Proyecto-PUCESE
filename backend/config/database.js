// backend/config/database.js
const mysql = require("mysql2");

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
        console.error('⚠️ La tabla "socios" no existe!');
      } else {
        console.log('✅ Tabla "socios" encontrada');
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

module.exports = db;
