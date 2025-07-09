const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const token = 'TU_TOKEN_DE_ZAPI'; // <-- Cambia esto por tu token real

function sendMessage(text) {
  axios.post(`https://api.z-api.io/instances/YOUR_INSTANCE_ID/token/${token}/send-message`, {
    phone: 'NUMERO_DEL_USUARIO', // <-- Aquí puedes dejarlo estático para pruebas, o mejorar luego con req.body
    message: text,
  }).catch((err) => console.error('Error al enviar mensaje:', err.message));
}

app.post('/', (req, res) => {
  const message = req.body.body?.message?.text?.toLowerCase?.();

  if (message === 'menú' || message === 'menu') {
    sendMessage('📋 *Menú principal:*\n1️⃣ Consultar DNI\n2️⃣ Ver estado\n3️⃣ Ayuda');
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Bot funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

