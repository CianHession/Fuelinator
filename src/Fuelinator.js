import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";

function Fuelinator() {
    const [stations, setStations] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [activeStation, setActiveStation] = useState(null);
    const [fuelType, setFuelType] = useState("");
    const [fuelPrice, setFuelPrice] = useState("");
    const [fuelData, setFuelData] = useState([]);
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
                setStations(data.results);
            }
        }
        fetchData();
    }, [google]);

    const handleMarkerClick = (props, marker) => {
        setActiveMarker(marker);
        setActiveStation(props.station);
        setFuelData([]);
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
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,formatted_address,geometry&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
            { mode: "cors" }
        );
        const data = await response.json();
        const fuelResponse = await fetch(
            `https://api.carbonintensity.org.uk/intensity?lat=${data.result.geometry.location.lat}&lon=${data.result.geometry.location.lng}`
        );
        const fuelData = await fuelResponse.json();
        setFuelData(fuelData.data);
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
                        {fuelData.length === 0 ? (
                            <div>
                                <p>Enter fuel type and price to get more information</p>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="fuelType">Fuel Type:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fuelType"
                                            placeholder="Enter fuel type"
                                            value={fuelType}
                                            onChange={handleFuelTypeChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fuelPrice">Fuel Price:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="fuelPrice"
                                            placeholder="Enter fuel price"
                                            value={fuelPrice}
                                            onChange={handleFuelPriceChange}
                                        />
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={handleSearchClick}>
                                        Search
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    Carbon Intensity: {fuelData[0].intensity ? fuelData[0].intensity.index : "N/A"}
                                </p>
                                <p>
                                    Intensity Forecast:{' '}
                                    {fuelData[0].intensity ? fuelData[0].intensity.forecast : "N/A"}
                                </p>
                                <p>
                                    Total Generation:{' '}
                                    {fuelData[0].generationmix
                                        ? fuelData[0].generationmix.reduce(
                                            (acc, curr) => acc + curr.perc,
                                            0
                                        )
                                        : "N/A"}{' '}
                                    % renewables
                                </p>
                            </div>
                        )}
                    </div>
                </InfoWindow>
            </Map>
        </div>
    );
}

export default Fuelinator;
