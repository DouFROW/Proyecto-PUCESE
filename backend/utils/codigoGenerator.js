// backend/utils/codigoGenerator.js
const SocioModel = require("../models/socioModel");

const generarCodigoSocio = async () => {
  try {
    const total = await SocioModel.contarTotal();
    const numero = total + 1;
    const codigo = `AET-${String(numero).padStart(4, "0")}`;
    console.log(`📝 Código generado: ${codigo}`);
    return codigo;
  } catch (error) {
    console.error("Error al generar código:", error);
    // En caso de error, usar un código basado en el timestamp
    const fallbackCode = `AET-${String(Date.now()).slice(-6)}`;
    return fallbackCode;
  }
};

module.exports = generarCodigoSocio;
