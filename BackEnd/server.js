const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fuelStations = require('../Data/combinedFormattedStations.json');

dotenv.config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 3001;

const myConnectionString = "mongodb+srv://Fuelinator:YSrjzd5iD1bCaCbD@fuelcluster.rm2qxw2.mongodb.net/Fuel?retryWrites=true&w=majority";
mongoose.connect(myConnectionString, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());

const fuelStationSchema = new mongoose.Schema({
    name: String,
    address: String,
    latitude: Number,
    longitude: Number,
    rating: Number,
});

const FuelStation = mongoose.model('FuelStation', fuelStationSchema);

// Push the JSON data to MongoDB
fuelStations.forEach(station => {
    const { name, address, latitude, longitude, rating } = station;

    FuelStation.findOne({ name, address })
        .then(existingStation => {
            if (existingStation) {
                console.log(`Skipping station ${name} at ${address} because it already exists.`);
                return;
            }

            const newStation = new FuelStation({
                name,
                address,
                latitude,
                longitude,
                rating
            });

            newStation.save()
                .then(savedStation => console.log(`Added station ${savedStation.name} at ${savedStation.address}.`))
                .catch(err => console.log(`Error adding station ${name} at ${address}: ${err.message}`));
        })
        .catch(err => console.log(`Error finding station ${name} at ${address}: ${err.message}`));
});


app.get('/api/fuelstations', (req, res) => {
    FuelStation.find({})
        .then(stations => res.json(stations))
        .catch(err => console.log(err));
});

app.post('/api/fuelstations', (req, res) => {
    const { name, address, latitude, longitude, rating } = req.body;
    const newStation = new FuelStation({
        name,
        address,
        latitude,
        longitude,
        rating
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
