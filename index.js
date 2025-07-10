const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  console.log("🔔 Webhook recibido:");
  console.log(JSON.stringify(req.body, null, 2)); // Muestra el contenido del mensaje recibido

  try {
    const message = req.body.message?.text?.body?.toLowerCase();
    const sender = req.body.message?.from;
    const name = req.body.message?.senderName || "usuario";

    if (!message || !sender) {
      console.log("❌ Mensaje inválido.");
      return res.sendStatus(400);
    }

    console.log("📩 Mensaje recibido:", message);

    if (message === "menu" || message === "menú") {
      const menuMessage = `
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
`;

      await axios.post("https://api.z-api.io/instances/3E3E734F23D450E9BA148258D1F0342D/token/0484ABAFEF4F50D7EBBE8506/send-messages", {
        phone: sender,
        message: menuMessage,
      });

      console.log("✅ Menú enviado correctamente.");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error al enviar el menú:", error.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("⚔️ Bot Akatsuki activo.");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

