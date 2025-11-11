// backend/models/socioModel.js
const db = require("../config/database");

const SocioModel = {
  // Crear un nuevo socio
  crear: (socioData) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO socios
        (codigo_socio, nombre, apellido, cedula, direccion, departamento,
         fecha_ingreso, nombre_banco, numero_cuenta, tipo_cuenta, email, telefono, estado, salario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Activo', 0)
      `;
      db.query(
        sql,
        [
          socioData.codigo_socio,
          socioData.nombre,
          socioData.apellido,
          socioData.cedula,
          socioData.direccion,
          socioData.departamento,
          socioData.fechaIngreso,
          socioData.nombrebank,
          socioData.numerodecuenta,
          socioData.tipodecuenta,
          socioData.email,
          socioData.telefono,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  // Obtener todos los socios
  obtenerTodos: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM socios ORDER BY fecha_ingreso DESC";
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Obtener socios activos
  obtenerActivos: () => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM socios WHERE estado = 'Activo' ORDER BY fecha_ingreso DESC";
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Obtener socio por ID
  obtenerPorId: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM socios WHERE id_socio = ?";
      db.query(sql, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  // Verificar cédula existente
  verificarCedula: (cedula) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT cedula FROM socios WHERE cedula = ?";
      db.query(sql, [cedula], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });
  },

  // Contar total de socios
  contarTotal: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) as total FROM socios", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].total);
        }
      });
    });
  },

  // Actualizar socio
  actualizar: (id, datos) => {
    return new Promise((resolve, reject) => {
      const campos = Object.keys(datos)
        .map((key) => `${key} = ?`)
        .join(", ");
      const valores = [...Object.values(datos), id];

      const sql = `UPDATE socios SET ${campos} WHERE id_socio = ?`;
      db.query(sql, valores, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Desactivar socio
  desactivar: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE socios SET estado = 'Inactivo' WHERE id_socio = ?";
      db.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Activar socio
  activar: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE socios SET estado = 'Activo' WHERE id_socio = ?";
      db.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Eliminar socio
  eliminar: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM socios WHERE id_socio = ?";
      db.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = SocioModel;
