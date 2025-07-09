const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const data = req.body;
  const text = data?.text?.message?.toLowerCase();
  const phone = data?.phone;

  console.log("📩 Mensaje recibido:", text);

  if (!text || !phone) {
    return res.sendStatus(400);
  }

  if (text === "menú" || text === "menu") {
    const menuText =
      "*📋 Menú principal:*\n" +
      "1️⃣ Consultar DNI\n" +
      "2️⃣ Consultar RUC\n" +
      "3️⃣ Hablar con un asesor\n\n" +
      "Escribe el número de la opción para continuar.";

    try {
      await axios.post(
        "https://api.z-api.io/instances/3E3E734F23D450E9BA148258D1F0342/token/0484ABAFEF4F50D7EBBE8506/v2/send-message",
        {
          phone: phone,
          message: menuText,
        }
      );
      console.log("✅ Menú enviado correctamente.");
    } catch (error) {
      console.error("❌ Error al enviar el menú:", error.message);
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("🤖 Bot de WhatsApp activo.");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

