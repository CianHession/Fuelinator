const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fuelStations = require('../Data/combinedFormattedStations.json');

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
    county: String,
    petrolPrice: Number,
    dieselPrice: Number
});

const FuelStation = mongoose.model('FuelStation', fuelStationSchema);

fuelStations.forEach(station => {
    const { name, address, latitude, longitude, rating, county, petrolPrice, dieselPrice } = station;

    FuelStation.findOne({ name, address })
        .then(existingStation => {
            if (existingStation) { }
            else {
                const newStation = new FuelStation({
                    name,
                    address,
                    latitude,
                    longitude,
                    rating,
                    county,
                    petrolPrice,
                    dieselPrice
                });
                newStation.save()
                    .then(savedStation => {
                        console.log(`Saved station ${savedStation.name}`);
                    })
                    .catch(error => {
                        console.error(`Error saving station ${name}: ${error}`);
                    });
            }
        })
        .catch(error => {
            console.error(`Error finding station ${name}: ${error}`);
        });
});

app.get('/api/fuelstations', (req, res) => {
    FuelStation.find({})
        .exec()
        .then(fuelStations => {
            res.json(fuelStations);
        })
        .catch(err => {
            console.error(`Error finding fuel stations: ${err}`);
            res.status(500).send(`Error finding fuel stations: ${err}`);
        });
});

app.put('/api/fuelstations/:id/', (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    FuelStation.findById(id)
        .exec()
        .then(fuelStation => {
            if (!fuelStation) {
                res.status(404).send(`Fuel station with ID ${id} not found`);
            } else {
                fuelStation.petrolPrice = req.body.petrolPrice || fuelStation.petrolPrice;
                fuelStation.dieselPrice = req.body.dieselPrice || fuelStation.dieselPrice;
                return fuelStation.save();
            }
        })
        .then(updatedStation => {
            res.json(updatedStation);
        })
        .catch(err => {
            console.error(`Error updating fuel station with ID ${id}: ${err}`);
            res.status(500).send(`Error updating fuel station with ID ${id}: ${err}`);
        });
});

app.get('/api/fuelstations/:id', (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    FuelStation.findById(id)
        .exec()
        .then(fuelStation => {
            if (!fuelStation) {
                res.status(404).send(`Fuel station with ID ${id} not found`);
            } else {
                res.json(fuelStation);
            }
        })
        .catch(err => {
            console.error(`Error finding fuel station with ID ${id}: ${err}`);
            res.status(500).send(`Error finding fuel station with ID ${id}: ${err}`);
        });
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