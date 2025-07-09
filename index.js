const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const body = req.body;

  const text = body?.text?.message?.toLowerCase(); // ahora sí: correcto
  const phone = body?.phone;

  if (!text || !phone) {
    console.log("❌ Datos inválidos:", body);
    return res.sendStatus(400);
  }

  console.log("📩 Mensaje recibido:", text);

  if (text === "menú" || text === "menu") {
    const menuText =
      "*📋 Menú principal:*\n" +
      "1️⃣ Consultar DNI\n" +
      "2️⃣ Consultar RUC\n" +
      "3️⃣ Hablar con un asesor\n\n" +
      "_Escribe el número de la opción para continuar._";

    try {
      await axios.post("https://api.z-api.io/instances/3E3E734F23D450E9BA148258D1F0342/token/0484ABAFEF4F50D7EBBE8506/send-messages", {
        phone: phone,
        message: menuText,
      });
      console.log("✅ Menú enviado a", phone);
    } catch (err) {
      console.error("❌ Error al enviar mensaje:", err.message);
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("🤖 Bot WhatsApp activo.");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

