import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";

function Fuelinator() {
    const [stations, setStations] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [activeStation, setActiveStation] = useState(null);
    const [fuelType, setFuelType] = useState("");
    const [fuelPrice, setFuelPrice] = useState("");
    const [google, setGoogle] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", () => {
            setGoogle(window.google);
        });
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (google) {
                const response = await fetch(
                    `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.1424,-7.6921&radius=50000&type=gas_station&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
                    { mode: "cors" }
                );
                const data = await response.json();
            }
        }
        fetchData();
    }, [google]);

    const handleMarkerClick = (props, marker) => {
        setActiveMarker(marker);
        setActiveStation(props.station);
        setFuelType("");
        setFuelPrice("");
    };

    const handleInfoWindowClose = () => {
        setActiveMarker(null);
        setActiveStation(null);
    };

    const handleFuelTypeChange = (e) => {
        setFuelType(e.target.value);
    };

    const handleFuelPriceChange = (e) => {
        setFuelPrice(e.target.value);
    };

    const handleSearchClick = async () => {
        const placeId = activeStation.place_id;
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.1424,-7.6921&radius=50000&type=gas_station&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
            { mode: "cors" }
        );
        const data = await response.json();
        alert(`You searched for ${fuelType} fuel at ${data.result.name}, located at ${data.result.formatted_address}, priced at ${fuelPrice} per liter.`);
};

return (
    <div>
        <div>
            <h1>Fuelinator</h1>
            <p>Click on a gas station marker to see more details and search for fuel prices</p>
        </div>
        <Map
            google={google}
            initialCenter={{
                lat: 53.1424,
                lng: -7.6921,
            }}
            zoom={10}
        >
            {stations.map((station) => (
                <Marker
                    key={station.id}
                    position={{
                        lat: station.geometry.location.lat,
                        lng: station.geometry.location.lng,
                    }}
                    onClick={handleMarkerClick}
                    station={station}
                />
            ))}
            <InfoWindow
                marker={activeMarker}
                onClose={handleInfoWindowClose}
                visible={activeMarker !== null}
            >
                <div>
                    <h3>{activeStation?.name}</h3>

                    <p>{activeStation?.vicinity}</p>
                    <div>
                        <label htmlFor="fuel-type-select">Fuel Type:</label>
                        <select id="fuel-type-select" onChange={handleFuelTypeChange}>
                            <option value="">Select fuel type</option>
                            <option value="Regular">Regular</option>
                            <option value="Premium">Premium</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fuel-price-input">Fuel Price:</label>
                        <input
                            id="fuel-price-input"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Enter fuel price per liter"
                            value={fuelPrice}
                            onChange={handleFuelPriceChange}
                        />
                    </div>
                    <button onClick={handleSearchClick} disabled={!fuelType || !fuelPrice}>
                        Search</button>
                </div>
            </InfoWindow>
        </Map>
    </div>
);
}
export default Fuelinator;