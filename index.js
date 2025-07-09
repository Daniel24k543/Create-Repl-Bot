const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  const body = req.body;
  const message = body?.body?.text?.toLowerCase();

  if (message === 'menu' || message === 'menú') {
    axios.post('https://api.z-api.io/instances/3E3E734F23D450E9BA148258D1F0342/token/0484ABAFFEF4F50D7EBBE8506/send-messages', {
      phone: body.body.sender.id,
      message: '📋 *Menú principal*\n1. Consultar DNI\n2. Ver estado\n3. Ayuda'
    }).catch(err => console.error('Error al enviar mensaje:', err.response?.data || err.message));
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
