// backend/server.js
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🚀 Servidor AETPUCE corriendo      ║
║   📍 http://localhost:${PORT}           ║
║   ✅ Listo para recibir peticiones   ║
╚═══════════════════════════════════════╝
  `);
});
