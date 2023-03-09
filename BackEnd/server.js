const dotenv = require('dotenv');
const express = require('express');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send(`Hello, this is the Fuelinator API.`);
});

app.get('/api/key', (req, res) => {
    res.json({
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
