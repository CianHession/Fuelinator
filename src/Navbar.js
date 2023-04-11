import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUser, loginUser, logoutUser } from "./Firebase";
import "./App.css";

function Navbar({ handleAboutClick }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticated = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(authenticated);

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser(auth);
            localStorage.setItem("isAuthenticated", "false");
            setIsAuthenticated(false);
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
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
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                            Home <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about" onClick={handleAboutClick}>
                            About
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {isAuthenticated ? (
                        <li className="nav-item">
                            <button className="nav-link" onClick={handleLogout}>
                                Sign Out
                            </button>
                        </li>
                    ) : null}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;