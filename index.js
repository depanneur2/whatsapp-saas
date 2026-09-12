const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route de test pour vérifier que le serveur tourne
app.get('/', (req, res) => {
    res.send('Le SaaS WhatsApp est en ligne et opérationnel !');
});

// Route de vérification exigée par Meta pour lier le webhook
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "mon_token_secret";

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
});

// Route webhook pour recevoir les messages de Meta / WhatsApp
app.post('/webhook', (req, res) => {
    console.log("Message ou événement reçu de WhatsApp :", JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
