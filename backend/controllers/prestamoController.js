const mysql = require("mysql2/promise");

const dbConfig = {
  host: "mysql_container", // si usas Docker
  user: "root",
  password: "rootpassword",
  database: "my_database",
};

// 🟢 Obtener todos los préstamos
exports.obtenerPrestamos = async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(`
      SELECT 
        sp.codigo_solicitud,
        sp.monto,
        sp.plazo,
        sp.fecha_solicitud,
        sp.motivo,
        sp.estado,
        s.id_socio,
        s.codigo_socio,
        s.nombre,
        s.apellido
      FROM solicitudes_prestamos AS sp
      JOIN socios AS s ON sp.socio_id = s.id_socio
      ORDER BY sp.fecha_solicitud DESC
    `);

    const formatted = rows.map((row) => ({
      codigo_solicitud: row.codigo_solicitud,
      monto: row.monto,
      plazo: row.plazo,
      fecha_solicitud: row.fecha_solicitud,
      motivo: row.motivo,
      estado: row.estado,
      socio: {
        id_socio: row.id_socio,
        codigo_socio: row.codigo_socio,
        nombre: row.nombre,
        apellido: row.apellido,
      },
    }));

    res.json(formatted);
  } catch (error) {
    console.error("❌ Error al obtener préstamos:", error);
    res.status(500).json({ error: "Error al obtener préstamos" });
  } finally {
    if (connection) await connection.end();
  }
};

// 🟢 Crear un nuevo préstamo
exports.crearPrestamo = async (req, res) => {
  const { socio_id, monto, plazo, motivo } = req.body;

  if (!socio_id || !monto || !plazo) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const codigoSolicitud = `SOL-${Date.now()}`;
    const fechaSolicitud = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    await connection.execute(
      `INSERT INTO solicitudes_prestamos 
        (codigo_solicitud, socio_id, monto, plazo, fecha_solicitud, motivo)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [codigoSolicitud, socio_id, monto, plazo, fechaSolicitud, motivo || null]
    );

    res
      .status(201)
      .json({
        message: "Préstamo creado correctamente",
        codigo: codigoSolicitud,
      });
  } catch (error) {
    console.error("❌ Error al crear préstamo:", error);
    res
      .status(500)
      .json({ error: "Error al crear préstamo", details: error.message });
  } finally {
    if (connection) await connection.end();
  }
};
