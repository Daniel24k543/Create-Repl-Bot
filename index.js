const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const data = req.body;

  // Verifica si viene un mensaje válido
  const text = data?.body?.text?.toLowerCase();
  const from = data?.body?.sender?.id;

  if (!text || !from) {
    console.log("Mensaje inválido recibido:", data);
    return res.sendStatus(400);
  }

  console.log("📩 Mensaje recibido:", text);

  // Respuesta al mensaje "menú" o "menu"
  if (text === "menú" || text === "menu") {
    const menuText =
      "*📋 Menú principal:*\n" +
      "1️⃣ Consultar DNI\n" +
      "2️⃣ Consultar RUC\n" +
      "3️⃣ Hablar con un asesor\n\n" +
      "_Escribe el número de la opción para continuar._";

    try {
      await axios.post("https://api.z-api.io/instances/3E3E734F23D450E9BA148258D1F0342/token/0484ABAFEF4F50D7EBBE8506/send-messages", {
        phone: from,
        message: menuText,
      });
      console.log("✅ Menú enviado correctamente");
    } catch (error) {
      console.error("❌ Error al enviar mensaje:", error.message);
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("✅ Bot WhatsApp activo.");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
