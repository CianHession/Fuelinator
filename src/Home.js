import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUser, loginUser } from "./Firebase";
import "./App.css";

const Home = () => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupPasswordError, setSignupPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showLogin, setShowLogin] = useState(true);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            localStorage.setItem('isAuthenticated', 'true');
            await loginUser(auth, loginEmail, loginPassword);
            navigate("/fuelinator"); // Navigate to protected route on successful login
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setErrorMessage("That Email is not registered to an account, please register below.");
            } else {
                setErrorMessage("Incorrect password, please try again.");
            }
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        if (signupPassword.length < 6) {
            setSignupPasswordError(true);
            return;
        }
        try {
            await createUser(auth, signupEmail, signupPassword);
            await loginUser(auth, signupEmail, signupPassword); // Login user after successful registration
            localStorage.setItem('isAuthenticated', 'true'); // Set authentication flag
            navigate("/fuelinator"); // Navigate to protected route on successful signup
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleToggle = () => {
        setShowLogin(!showLogin);
        setErrorMessage("");
        setSignupPasswordError(false);
    };

    return (
        <div className="home-container">
            <h1 className="home-heading">Welcome to Fuelinator!</h1>
            <div className="form-container">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {showLogin ? (
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <div className="form-input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={loginEmail}
                                onChange={(event) => setLoginEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={loginPassword}
                                onChange={(event) => setLoginPassword(event.target.value)}
                            />
                        </div>
                        <button type="submit">Login</button>
                        <p>
                            Don't have an account?{" "}
                            <button type="button" onClick={handleToggle}>
                                Register Here
                            </button>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleSignup}>
                        <h2>Register</h2>
                        <div className="form-input">
                            <label htmlFor="signup-email">Email</label>
                            <input
                                type="email"
                                id="signup-email"
                                value={signupEmail}
                                onChange={(event) => setSignupEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="signup-password">Password</label>
                            <input
                                type="password"
                                id="signup-password"
                                value={signupPassword}
                                onChange={(event) => setSignupPassword(event.target.value)}
                            />
                            {signupPasswordError && (
                                <p className="error-message">
                                    Password must be at least 6 characters long.
                                </p>
                            )}
                        </div>
                        <button type="submit">Sign up</button>
                        <p>
                            Already have an account?{" "}
                            <label type="label" onClick={handleToggle}>
                                    <a href=""> Login Here </a>
                            </label>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Home;