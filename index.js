const express = require('express');
const cors = require('cors'); // <--- Agregamos CORS
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // <--- Activamos CORS
app.use(express.json());

// Ruta principal para recibir mensajes
app.post('/', async (req, res) => {
  const data = req.body;

  // Asegúrate de que hay texto en el mensaje
  if (data?.text?.message) {
    const mensaje = data.text.message.toLowerCase();

    // Detectamos el comando "menu"
    if (mensaje === 'menu') {
      const numero = data.participantPhone || data.phone;

      const payload = {
        phone: numero,
        message:
          '*📋 MENÚ PRINCIPAL*\n\n' +
          '1️⃣ Consultar DNI\n' +
          '2️⃣ Ver horarios\n' +
          '3️⃣ Hablar con un asesor\n\n' +
          '_Escribe el número de la opción que deseas._'
      };

      // Enviar mensaje a través de Z-API
      try {
        await axios.post('https://api.z-api.io/instances/TU_INSTANCE_ID/token/TU_TOKEN_ZAPI/send-text', payload);
        console.log('Menú enviado correctamente.');
      } catch (error) {
        console.error('Error al enviar el mensaje:', error.message);
      }
    }
  }

  res.sendStatus(200); // Siempre respondemos 200 para que Z-API no reintente
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
