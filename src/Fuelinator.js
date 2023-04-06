import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { counties, irelandCoords} from "./Counties";

function Fuelinator() {
    const [google, setGoogle] = useState(null);
    const [fuelStations, setFuelStations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState(null);

    const handleMarkerClick = async (id) => {
        const selectedStation = fuelStations.find((station) => station._id === id);
        if (selectedStation) {
            try {
                const response = await fetch(`http://localhost:3001/api/fuelstations/${id}`);
                const data = await response.json();
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
                            url: "https://raineycawthon.com/img/256px/7.png",
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
                                url: "https://raineycawthon.com/img/256px/7.png",
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
                    <Map google={google} zoom={7} initialCenter={irelandCoords}>
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
                <select className="custom-dropdown-menu" value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)}>
                    <option value="">Select County</option>
                    {counties.map((county) => (
                        <option key={county} value={county}>
                            {county}
                        </option>
                    ))}
                </select>
                {selectedMarker && (
                    <div className="station-data">
                        <h2>{selectedMarker.name}</h2>
                        <p>{selectedMarker.address}</p>
                        <p>{`Petrol Price: €${selectedMarker.petrolPrice}`}</p>
                        <p>{`Diesel Price: €${selectedMarker.dieselPrice}`}</p>
                        <p>{`Rating: ${selectedMarker.rating}`}</p>
                    </div>

                )}
            </div>
        </div>
    );
}
export default Fuelinator;