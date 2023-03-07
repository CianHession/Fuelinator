import React, { useState, useEffect } from 'react';
import { Map, Marker, InfoWindow } from 'google-maps-react';

function FuelPriceFinder() {
    const [stations, setStations] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [activeStation, setActiveStation] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=53.1424,-7.6921&radius=5000&type=gas_station&key=AIzaSyBzE-baddsffMdIHJMehzzSHBimTssLOUo`
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

    const mapStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        }
    ];

    return (
        <div>
            <Map
                google={window.google}
                initialCenter={{ lat: 53.1424, lng: -7.6921 }}
                apiKey="AIzaSyBzE-baddsffMdIHJMehzzSHBimTssLOUo"
                styles={mapStyles}
                onClick={handleMapClick}
            >
                {stations.map((station) => (
                    <Marker
                        key={station.id}
                        position={station.geometry.location}
                        onClick={handleMarkerClick}
                        station={station}
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

export default FuelPriceFinder;
