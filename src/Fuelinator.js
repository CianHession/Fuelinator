import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { counties, countyCoords } from "./counties";

function Fuelinator() {
    const [google, setGoogle] = useState(null);
    const [fuelStations, setFuelStations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const irelandCoords = {
        lat: 53.1424,
        lng: -7.6921
    };

    const handleMarkerClick = (id) => {
        console.log("Marker clicked:", id);
        const selectedStation = fuelStations.find((station) => station._id === id);
        setSelectedMarker(selectedStation || null);
    };

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
        return fuelStations.map((station) => {
            const { _id, latitude, longitude, name, address, rating } = station;
            console.log("Selected Marker:", selectedMarker);
            return (
                <Marker
                    key={_id}
                    position={{ lat: latitude, lng: longitude }}
                    name={name}
                    address={address}
                    rating={rating}
                    onClick={() => handleMarkerClick(_id)}
                    icon={{
                        url: "https://raineycawthon.com/img/256px/7.png",
                        scaledSize: new window.google.maps.Size(36, 36),
                    }}
                />
            );
        });
    };

    return (
        <div>
            <h1>Fuelinator</h1>
            <div style={{ width: "100%", height: "80vh" }}>
                {google && (
                    <Map
                        google={google}
                        zoom={7}
                        initialCenter={irelandCoords}
                    >
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
        </div>
    );
}

export default Fuelinator;