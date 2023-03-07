import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";

function Fuelinator() {
    const [stations, setStations] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [activeStation, setActiveStation] = useState(null);

    const mapStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
        },
    ];

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.1424,-7.6921&radius=50000&type=gas_station&key=${process.env.REACT_APP_API_KEY}`
            );
            const data = await response.json();
            setStations(data.results);
        }
        fetchData();
    }, []);

    const handleMarkerClick = (props, marker, e) => {
        setActiveStation(props.station);
        setActiveMarker(marker);
    };

    const handleMapClick = (props) => {
        if (activeMarker) {
            setActiveMarker(null);
            setActiveStation(null);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    Fuelinator
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">
                                About
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            {window.google ? (
                <Map
                    google={window.google}
                    initialCenter={{ lat: 53.3498, lng: -6.2603 }}
                    style={{ height: "100%", position: "relative", width: "100%" }}
                    className="map"
                    zoom={11}
                    styles={mapStyles}
                    onClick={handleMapClick}
                >
                    {stations.map((station) => (
                        <Marker
                            key={station.place_id}
                            title={station.name}
                            name={station.name}
                            position={station.geometry.location}
                            onClick={(props, marker, e) => handleMarkerClick({ station }, marker, e)}
                        />
                    ))}
                    {activeMarker && (
                        <InfoWindow marker={activeMarker}>
                            <div>
                                <h6>{activeStation.name}</h6>
                                <p>{activeStation.vicinity}</p>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            ) : (
                <div>Loading Map...</div>
            )}
        </div>
    );
}

export default Fuelinator;
