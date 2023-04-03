import React, { useState, useEffect } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { counties, countyCoords } from "./counties";

function Fuelinator() {
    const [google, setGoogle] = useState(null);
    const [places, setPlaces] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [fuelStations, setFuelStations] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (id) => {
        console.log("Marker clicked:", id);
        const selectedStation = fuelStations.find((station) => station._id === id);
        setSelectedMarker(selectedStation);
    };


    const handleCountySelect = async (selectedOption) => {
        setSelectedCounty(selectedOption);
        const county = selectedOption.value;

        try {
            const response = await fetch("http://localhost:3001/api/fuelstations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ county }),
            });
            const data = await response.json();
            setPlaces(data);
        } catch (error) {
            console.error("Error fetching fuel stations:", error);
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
        if (google && selectedCounty) {
            const county = selectedCounty.value;
            const service = new google.maps.places.PlacesService(
                document.createElement("div")
            );
            service.textSearch(
                {
                    query: `fuel stations in ${county}, Ireland`,
                    type: ["gas_station"],
                },
                (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        const stations = results.map((place) => {
                            return {
                                name: place.name,
                                address: place.formatted_address,
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng(),
                            };
                        });
                        setFuelStations(stations);
                        setPlaces(results);

                        const countyBounds = new google.maps.LatLngBounds();
                        countyBounds.extend(countyCoords[county]);
                        const map = document.getElementById("map");
                        map.fitBounds(countyBounds);
                    } else {
                        console.error("Error fetching places:", status);
                    }
                }
            );
        }
    }, [google, selectedCounty]);

    const renderMarkers = () => {
        return fuelStations.map((station) => {
            const { _id, lat, lng, name, address, dieselPrice, petrolPrice } = station;
            console.log("Selected Marker:", selectedMarker);
            return (
                <Marker
                    key={_id}
                    position={{ lat, lng }}
                    name={name}
                    address={address}
                    dieselPrice={dieselPrice}
                    petrolPrice={petrolPrice}
                    onClick={() => handleMarkerClick(_id)}
                    icon={{
                        url: "https://raineycawthon.com/img/256px/7.png",
                        scaledSize: new window.google.maps.Size(36, 36),
                    }}
                    selected={selectedMarker?._id === _id && selectedMarker}
                >
                    {selectedMarker?._id === _id && (
                        <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                            <div>
                                <h6>{name}</h6>
                                <p>Address: {address}</p>
                                {dieselPrice && <p>Diesel price: {dieselPrice} €/L</p>}
                                {petrolPrice && <p>Petrol price: {petrolPrice} €/L</p>}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            );
        });
    };


    const renderMap = () => {
        if (!google) {
            return null;
        }
        return (
            <Map
                google={google}
                zoom={7}
                initialCenter={{ lat: 53.1424, lng: -7.6921 }}
            >
                {renderMarkers()}
            </Map>
        );
    };

    const renderCountySelect = () => {
        return (
            <Select
                options={counties}
                onChange={handleCountySelect}
                placeholder="Select a County"
            />
        );
    };

    return (
        <div>
            {renderCountySelect()}
            {renderMap()}
        </div>
    );
}

export default Fuelinator