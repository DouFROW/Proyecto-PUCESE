const db = require("../config/database");

const Prestamo = {
  obtenerTodos: (callback) => {
    db.query("SELECT * FROM solicitudes_prestamos", callback);
  },

  crear: (data, callback) => {
    const { socio_id, monto, plazo, motivo } = data;
    const codigo_solicitud = `SOL-${Date.now()}`;
    const fecha_solicitud = new Date();

    db.query(
      "INSERT INTO solicitudes_prestamos (codigo_solicitud, socio_id, monto, plazo, fecha_solicitud, motivo) VALUES (?, ?, ?, ?, ?, ?)",
      [codigo_solicitud, socio_id, monto, plazo, fecha_solicitud, motivo],
      callback
    );
  },
};

module.exports = Prestamo;
