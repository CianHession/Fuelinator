import React, { useState, useEffect } from "react";
import { Map, Marker } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";

function Fuelinator() {
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

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Fuelinator</a>
            </nav>
            <Map
                google={google}
                initialCenter={{
                    lat: 53.1424,
                    lng: -7.6921,
                }}
                zoom={7}
            >
            </Map>
        </div>
    );
}

export default Fuelinator;
