const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
dotenv.config(); // Load environment variables from .env file

const myConnectionString = "mongodb+srv://Fuelinator:YSrjzd5iD1bCaCbD@fuelcluster.rm2qxw2.mongodb.net/Fuel?retryWrites=true&w=majority";
mongoose.connect(myConnectionString, { useNewUrlParser: true });

app.use(bodyParser.json(), cors());

const fuelStationSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    county: String,
    postcode: String,
    lat: Number,
    lng: Number,
    dieselPrice: Number,
    petrolPrice: Number,
});

const FuelStation = mongoose.model('FuelStation', fuelStationSchema);

app.get('/api/fuelstations', (req, res) => {
    FuelStation.find({})
        .then(stations => res.json(stations))
        .catch(err => console.log(err));
});

app.post('/api/fuelstations', (req, res) => {
    const { name, address, city, county, postcode, lat, lng, dieselPrice, petrolPrice } = req.body;
    const newStation = new FuelStation({
        name,
        address,
        city,
        county,
        postcode,
        lat,
        lng,
        dieselPrice,
        petrolPrice
    });
    newStation.save()
        .then(station => res.json(station))
        .catch(err => console.log(err));
});

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