import React, { useState, useEffect } from "react";
import { Map, Marker } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Select from "react-select";

const counties = [
    { value: "carlow", label: "Carlow" },{ value: "cavan", label: "Cavan" },{ value: "clare", label: "Clare" },{ value: "cork", label: "Cork" },{ value: "donegal", label: "Donegal" },{ value: "dublin", label: "Dublin" },{ value: "galway", label: "Galway" },{ value: "kerry", label: "Kerry" },{ value: "kildare", label: "Kildare" },{ value: "kilkenny", label: "Kilkenny" },{ value: "laois", label: "Laois" },{ value: "leitrim", label: "Leitrim" },{ value: "limerick", label: "Limerick" },{ value: "longford", label: "Longford" },{ value: "louth", label: "Louth" },{ value: "mayo", label: "Mayo" },{ value: "meath", label: "Meath" },{ value: "monaghan", label: "Monaghan" },{ value: "offaly", label: "Offaly" },{ value: "roscommon", label: "Roscommon" },{ value: "sligo", label: "Sligo" },{ value: "tipperary", label: "Tipperary" },{ value: "waterford", label: "Waterford" },{ value: "westmeath", label: "Westmeath" },{ value: "wexford", label: "Wexford" },{ value: "wicklow", label: "Wicklow" }
];

function Fuelinator() {
    const [google, setGoogle] = useState(null);
    const [places, setPlaces] = useState([]);
    const [showAboutPopup, setShowAboutPopup] = useState(false);
    const [selectedCounty, setSelectedCounty] = useState(null);

    const handleAboutClick = () => {
        setShowAboutPopup(true);
    };

    const handlePopupClose = () => {
        setShowAboutPopup(false);
    };

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
                    } else {
                        console.error("Error fetching places:", status);
                    }
                }
            );
            const countyBounds = new google.maps.LatLngBounds();
            const countyCoords = { carlow: { lat: 52.719812, lng: -6.85017 }, cavan: { lat: 53.9941667, lng: -7.3608333 }, clare: { lat: 52.9388305, lng: -9.4154649 }, cork: { lat: 51.8985147, lng: -8.4756035 }, donegal: { lat: 54.654899, lng: -8.104584 }, dublin: { lat: 53.3498053, lng: -6.2603097 }, galway: { lat: 53.2719444, lng: -9.0488889 }, kerry: { lat: 52.1544611, lng: -9.5668634 }, kildare: { lat: 53.2158333, lng: -6.6669444 }, kilkenny: { lat: 52.6541456, lng: -7.2447879 }, laois: { lat: 52.9948567, lng: -7.3322721 }, leitrim: { lat: 54.1035488, lng: -8.0671832 }, limerick: { lat: 52.6638567, lng: -8.626774 }, longford: { lat: 53.725678, lng: -7.8001395 }, louth: { lat: 53.9487442, lng: -6.5423279 }, mayo: { lat: 53.8857795, lng: -9.2990676 }, meath: { lat: 53.6055483, lng: -6.6564174 }, monaghan: { lat: 54.2492084, lng: -6.9683314 }, offaly: { lat: 53.2352378, lng: -7.7120965 }, roscommon: { lat: 53.7487583, lng: -8.2319744 }, sligo: { lat: 54.2697059, lng: -8.4698917 }, tipperary: { lat: 52.4736893, lng: -8.1558759 }, waterford: { lat: 52.2593201, lng: -7.1100707 }, westmeath: { lat: 53.5346789, lng: -7.465343 }, wexford: { lat: 52.4601862, lng: -6.5871491 }, wicklow: { lat: 52.9808203, lng: -6.0445899 } };            const countyCoord = countyCoords[county];
            countyBounds.extend(countyCoord);
            const map = document.getElementById("map")
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
                zoom={8}
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
            <Navbar onAboutClick={handleAboutClick} />
            {renderCountySelect()}
            {renderMap()}
        </div>
    );
}

export default Fuelinator