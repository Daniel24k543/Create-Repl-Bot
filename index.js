const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("⚔️ Bot Akatsuki activo.");
});

app.post("/webhook", async (req, res) => {
  const data = req.body;

  const text = data?.text?.message?.toLowerCase();
  const phone = data?.phone;

  console.log("📥 Mensaje recibido:", text);

  if (!text || !phone) return res.sendStatus(200);

  if (text === "menú" || text === "menu") {
    const message = 
`┃ 『⚔️ 𝐃𝐀𝐓𝐀 𝐀𝐊𝐀𝐓𝐒𝐔𝐊𝐈 ⚡』
┃ *SISTEMA DE COMANDOS*
╰───────◆◇◆───────╯

👤 *Hola,* 👋

*BIENVENIDO A NUESTRO MENÚ PRINCIPAL DE COMANDOS.*

🔎 _Selecciona una opción según la categoría que deseas explorar._

╭──『🗂️ OPCIONES DISPONIBLES』──╮
│ 📇 RENIEC         📱 TELEFONÍA
│ 🚓 DELITOS        🚗 SUNARP
│ ⚙️ GENERADOR      👨‍👩‍👧‍👦 FAMILIARES
│ 🎫 BAUCHER        🔍 INFO DNI
│ 🎁 GRATIS         🛡️ PNP
│ 🌐 MUNDIAL        🕒 TEMPORAL
╰────────────────────────────╯`;

    try {
      await axios.post(
        "https://api.z-api.io/instances/3E3E734F23D450E9BA148258D1F0342/token/0484ABAFEF4F50D7EBBE8506/send-messages",
        {
          phone: phone,
          message: message,
        }
      );

      console.log("✅ Menú enviado correctamente.");
    } catch (err) {
      console.error("❌ Error al enviar el menú:", err.message);
    }
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
