const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const message = req.body.message;
  if (!message) return res.sendStatus(400);

  const text = message.text?.message?.toLowerCase(); // ✅ captura correctamente
  const from = message.phone;
  const name = message.pushName || "usuario";

  console.log("📩 Mensaje recibido:", text);

  if (text === "menú" || text === "menu") {
    const menuMessage = {
      phone: from,
      message: `
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
`
    };

    try {
      await axios.post(
        "https://api.z-api.io/instances/3E3E734F23D450E9BA148258D1F0342D/token/0484ABAFEF4F50D7EBBE8506/send-messages",
        menuMessage
      );
      console.log("✅ Menú enviado correctamente.");
    } catch (error) {
      console.error("❌ Error al enviar el menú:", error.message);
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("⚔️ Bot Akatsuki activo.");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
