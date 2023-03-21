import React, { useState, useEffect } from "react";
import { Map, Marker } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Select from "react-select";
import { counties, countyCoords } from './counties';

function Fuelinator() {
    const [google, setGoogle] = useState(null);
    const [places, setPlaces] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState(null);

    const handleCountySelect = (selectedOption) => {
        setSelectedCounty(selectedOption);
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
        return places.map((place) => {
            return (
                <Marker
                    key={place.place_id}
                    position={{
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    }}
                    icon={{
                        url: 'https://raineycawthon.com/img/256px/7.png',
                        scaledSize: new window.google.maps.Size(36, 36) // Set the size you want here
                    }}
                />
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