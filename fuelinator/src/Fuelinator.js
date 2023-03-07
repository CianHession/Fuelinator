import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";

function Fuelinator() {
    const [stations, setStations] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [activeStation, setActiveStation] = useState(null);

    const mapStyles = [{
        featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }],
    },
    ];

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.1424,-7.6921&radius=50000&type=gas_station&key=AIzaSyBzE-baddsffMdIHJMehzzSHBimTssLOUo`
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
            <Map
                google={window.google}
                initialCenter={{ lat: 53.3498, lng: -6.2603 }}
                style={{ height: "100%", position: "relative", width: "100%" }}
                className={"map"}
                zoom={8}
                styles={mapStyles}
                onClick={handleMapClick}
            >
                {stations.map((station) => (
                    <Marker
                        key={station.id}
                        position={station.geometry.location}
                        onClick={handleMarkerClick}
                        station={station}
                        icon={{
                            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                            scaledSize: new window.google.maps.Size(40, 40),
                        }}
                        label={{
                            text: station.name,
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    />
                ))}
                <InfoWindow marker={activeMarker} visible={!!activeMarker}>
                    <div>
                        <h4>{activeStation?.name}</h4>
                        <p>{activeStation?.vicinity}</p>
                        <p>Rating: {activeStation?.rating}</p>
                        <p>Open now: {activeStation?.opening_hours?.open_now ? "Yes" : "No"}</p>
                    </div>
                </InfoWindow>
            </Map>
        </div>
    );
}
export default Fuelinator;