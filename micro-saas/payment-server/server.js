const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/payment', (req, res) => {
    const { name, email, cardNumber, expiration, cvv, total } = req.body;
    console.log('Received payment details:', req.body);
    // Ici, ajoutez la logique pour traiter les informations de paiement
    res.json({ message: 'Payment processed successfully' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
