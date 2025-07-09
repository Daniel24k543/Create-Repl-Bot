const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// Tu instancia y token de Z-API
const API_URL = "https://api.z-api.io/instances/3E3E734F23D450E9BA148258D1F0342D/token/0484ABAFEF4F50D7EBBE8506/send-messages";

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const body = req.body;
  const message = body?.body?.text;
  const sender = body?.body?.sender?.id;
  const name = body?.body?.sender?.name || "usuario";

  console.log("📨 Mensaje recibido:", message);

  // Validamos palabra clave
  if (message?.toLowerCase() === "menú" || message?.toLowerCase() === "menu") {
    const menu = `╭───────◆◇◆───────╮
┃ 『⚔️ 𝐃𝐀𝐓𝐀 𝐀𝐊𝐀𝐓𝐒𝐔𝐊𝐈 ⚡』
┃ *SISTEMA DE COMANDOS*
╰───────◆◇◆───────╯

👤 *Hola,* ${name} 👋

*BIENVENIDO A NUESTRO MENÚ PRINCIPAL DE COMANDOS.*

🔎 _Selecciona una opción según la categoría que deseas explorar._

╭──『🗂️ OPCIONES DISPONIBLES』──╮
│ 📇 RENIEC         📱 TELEFONÍA
│ 🚓 DELITOS        🚗 SUNARP
│ ⚙️ GENERADOR      👨‍👩‍👧‍👦 FAMILIARES
│ 🎫 BAUCHER        🔍 INFO DNI
│ 🎁 GRATIS         🛡️ PNP
│ 🌐 MUNDIAL        🕒 TEMPORAL
╰────────────────────────────╯

📚 _Escribe el nombre del módulo para acceder._
`;

    try {
      await axios.post(API_URL, {
        phone: sender,
        message: menu,
      });
      console.log("✅ Menú enviado correctamente.");
    } catch (error) {
      console.error("❌ Error al enviar el menú:", error.message);
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("🟢 Bot activo y funcionando.");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

