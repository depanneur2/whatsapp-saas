const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route de test pour vérifier que le serveur tourne
app.get('/', (req, res) => {
  res.send('Le SaaS WhatsApp est en ligne et opérationnel !');
});

// Route webhook pour recevoir les messages de Meta / WhatsApp
app.post('/webhook', (req, res) => {
  console.log("Message ou événement reçu de WhatsApp :", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
