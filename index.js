const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.sendStatus(400);
  }

  const text = message.text?.body?.toLowerCase(); // convertir a minúsculas
  const from = message.from;

  console.log("Mensaje recibido:", text);

  if (text === "menú" || text === "menu") {
    const menuText =
      "*📋 Menú principal:*\n" +
      "1️⃣ Consultar DNI\n" +
      "2️⃣ Consultar RUC\n" +
      "3️⃣ Hablar con un asesor\n\n" +
      "Escribe el número de la opción para continuar.";

    try {
      await axios.post("https://api.z-api.io/instances/TU_INSTANCIA/token/TU_TOKEN/send-messages", {
        phone: from,
        message: menuText,
      });
    } catch (error) {
      console.error("Error al enviar mensaje:", error.message);
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Bot activo.");
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

