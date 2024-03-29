﻿import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { counties, irelandCoords } from "./Counties";
import { useNavigate } from 'react-router-dom';

function Fuelinator() {
    const [google, setGoogle] = useState(null);
    const [fuelStations, setFuelStations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState("");
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const handlePetrolPriceChange = (event) => {
        setSelectedMarker({
            ...selectedMarker,
            petrolPrice: Number(event.target.value),
        });
    };

    const handleDieselPriceChange = (event) => {
        setSelectedMarker({
            ...selectedMarker,
            dieselPrice: Number(event.target.value),
        });
    };

    const findCheapestDieselPrice = () => {
        let cheapestDieselPrice = Number.MAX_VALUE;
        let cheapestDieselStation = null;

        if (selectedCounty) {
            for (let station of fuelStations) {
                if (station.county === selectedCounty) {
                    if (station.dieselPrice < cheapestDieselPrice) {
                        cheapestDieselPrice = station.dieselPrice;
                        cheapestDieselStation = station;
                    }
                }
            }
            setSelectedMarker(cheapestDieselStation);
        } else {
            for (let station of fuelStations) {
                if (station.dieselPrice < cheapestDieselPrice) {
                    cheapestDieselPrice = station.dieselPrice;
                    cheapestDieselStation = station;
                }
            }
            setSelectedMarker(cheapestDieselStation);
        }
    };

    const findCheapestPetrolPrice = () => {
        let cheapestPetrolPrice = Number.MAX_VALUE;
        let cheapestPetrolStation = null;

        if (selectedCounty) {
            for (let station of fuelStations) {
                if (station.county === selectedCounty) {
                    if (station.petrolPrice < cheapestPetrolPrice) {
                        cheapestPetrolPrice = station.petrolPrice;
                        cheapestPetrolStation = station;
                    }
                }
            }
            setSelectedMarker(cheapestPetrolStation);
        } else {
            for (let station of fuelStations) {
                if (station.petrolPrice < cheapestPetrolPrice) {
                    cheapestPetrolPrice = station.petrolPrice;
                    cheapestPetrolStation = station;
                }
            }
            setSelectedMarker(cheapestPetrolStation);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (
            selectedMarker.petrolPrice < 0.99 ||
            selectedMarker.petrolPrice > 2.2 ||
            selectedMarker.dieselPrice < 0.99 ||
            selectedMarker.dieselPrice > 2.2
        ) {
            alert("Prices must be between 1.0 and 2.1");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3001/api/fuelstations/${selectedMarker._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        petrolPrice: selectedMarker.petrolPrice,
                        dieselPrice: selectedMarker.dieselPrice,
                    }),
                }
            );
            const data = await response.json();
            const updatedFuelStations = fuelStations.map((station) => {
                if (station._id === selectedMarker._id) {
                    return {
                        ...station,
                        petrolPrice: data.petrolPrice || "N/A",
                        dieselPrice: data.dieselPrice || "N/A",
                    };
                }
                return station;
            });
            setFuelStations(updatedFuelStations);
            setSelectedMarker({
                ...selectedMarker,
                petrolPrice: data.petrolPrice || "N/A",
                dieselPrice: data.dieselPrice || "N/A",
            });
        } catch (error) {
            console.error("Error updating fuel station data:", error);
        }
    };

    const handleMarkerClick = async (id) => {
        const selectedStation = fuelStations.find((station) => station._id === id);
        if (selectedStation) {
            try {
                const response = await fetch(`http://localhost:3001/api/fuelstations/${id}`);
                const data = await response.json();
                setEditMode(false);
                setSelectedMarker({
                    ...selectedStation,
                    petrolPrice: data.petrolPrice || "N/A",
                    dieselPrice: data.dieselPrice || "N/A",
                });
            } catch (error) {
                console.error("Error fetching fuel station data:", error);
            }
        }
    };

    useEffect(() => {
        let cheapestDieselPrice = Number.MAX_VALUE;
        let selectedMarker = null;
        for (let station of fuelStations) {
            if (station.county === selectedCounty && station.dieselPrice < cheapestDieselPrice) {
                cheapestDieselPrice = station.dieselPrice;
                selectedMarker = station;
            }
        }
        setSelectedMarker(selectedMarker);
    }, [fuelStations, selectedCounty]);


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
        if (localStorage.getItem('isAuthenticated') !== 'true') {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const fetchFuelStations = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/fuelstations");
                const data = await response.json();
                setFuelStations(data);
            } catch (error) {
                console.error("Error fetching fuel stations:", error);
            }
        };
        fetchFuelStations();
    }, []);

    const renderMarkers = () => {
        if (!selectedCounty) {
            return fuelStations.map((station) => {
                const { _id, latitude, longitude, name, address, rating } = station;
                return (
                    <Marker
                        key={_id}
                        position={{ lat: latitude, lng: longitude }}
                        name={name}
                        address={address}
                        rating={rating}
                        onClick={() => handleMarkerClick(_id)}
                        icon={{
                            url: selectedMarker && selectedMarker._id === _id
                                ? "https://raineycawthon.com/img/256px/7_selected.png"
                                : "https://raineycawthon.com/img/256px/7.png",
                            scaledSize: new window.google.maps.Size(36, 36),
                        }}
                    >
                        {selectedMarker && selectedMarker._id === _id && (
                            <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                                <div>
                                    <h2>{name}</h2>
                                    <p>{address}</p>
                                    {selectedMarker.petrolPrice && (
                                        <p>{`Petrol Price: €${selectedMarker.petrolPrice}`}</p>
                                    )}
                                    {selectedMarker.dieselPrice && (
                                        <p>{`Diesel Price: €${selectedMarker.dieselPrice}`}</p>
                                    )}
                                    <p>{`Rating: ${rating}`}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                );
            });
        } else {
            return fuelStations
                .filter((station) => station.county === selectedCounty)
                .map((station) => {
                    const { _id, latitude, longitude, name, address, rating } = station;
                    return (
                        <Marker
                            key={_id}
                            position={{ lat: latitude, lng: longitude }}
                            name={name}
                            address={address}
                            rating={rating}
                            onClick={() => handleMarkerClick(_id)}
                            icon={{
                                url: selectedMarker && selectedMarker._id === _id
                                    ? "https://raineycawthon.com/img/256px/7_selected.png"
                                    : "https://raineycawthon.com/img/256px/7.png",
                                scaledSize: new window.google.maps.Size(36, 36),
                            }}
                        >
                            {selectedMarker && selectedMarker._id === _id && (
                                <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                                    <div>
                                        <h2>{name}</h2>
                                        <p>{address}</p>
                                        {selectedMarker.petrolPrice && (
                                            <p>{`Petrol Price: €${selectedMarker.petrolPrice}`}</p>
                                        )}
                                        {selectedMarker.dieselPrice && (
                                            <p>{`Diesel Price: €${selectedMarker.dieselPrice}`}</p>
                                        )}
                                        <p>{`Rating: ${rating}`}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    );
                });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <div style={{ width: '100%', height: '80vh' }}>
                {google && (
                    <Map google={google} zoom={7} initialCenter={irelandCoords} mapTypeControl={false}>
                        {renderMarkers()}
                        {selectedMarker && (
                            <InfoWindow
                                position={{
                                    lat: selectedMarker.latitude,
                                    lng: selectedMarker.longitude,
                                }}
                                onCloseClick={() => setSelectedMarker(null)}
                            >
                                <div>
                                    <h2>{selectedMarker.name}</h2>
                                    <p>{selectedMarker.address}</p>
                                    <p>{`Rating: ${selectedMarker.rating}`}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </Map>
                )}
            </div>
            <div>
                <select style={{ display: "flex" }} className="countySelect" value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)}>
                    <option value="">Select County</option>
                    {counties.map((county) => (
                        <option key={county} value={county}>
                            {county}
                        </option>
                    ))}
                </select>
                <div>
                    <p>Let's Save Money!</p>
                </div>
                <div style={{ display: "flex" }}>
                    <button className="button-style" onClick={findCheapestDieselPrice}>
                        {selectedCounty ? `Cheapest Diesel in ${selectedCounty}` : 'Cheapest Diesel in Ireland'}
                    </button>
                    <button className="button-style" onClick={findCheapestPetrolPrice}>
                        {selectedCounty ? `Cheapest Petrol in ${selectedCounty}` : 'Cheapest Petrol in Ireland'}
                    </button>
                </div>
                {selectedMarker && (
                    <div className="station-data">
                        <h2>{selectedMarker.name}</h2>
                        <p>{selectedMarker.address}</p>
                        <p>{`Petrol Price: €${selectedMarker.petrolPrice}`}</p>
                        <p>{`Diesel Price: €${selectedMarker.dieselPrice}`}</p>
                        <button onClick={() => setEditMode(!editMode)}>Edit Fuel Prices</button>
                    </div>
                )}
                {editMode && (
                    <form onSubmit={handleFormSubmit} disabled={!editMode}>
                        <label>
                            New Petrol Price:
                            <input type="number" value={selectedMarker.petrolPrice} onChange={handlePetrolPriceChange} />
                        </label>
                        <label>
                            New Diesel Price:
                            <input type="number" value={selectedMarker.dieselPrice} onChange={handleDieselPriceChange} />
                        </label>
                        <br />
                        <button className="btn" type="submit">Update Prices</button>
                        <br />
                        <button className="btn" onClick={() => setEditMode(false)}>Cancel Editing</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Fuelinator;