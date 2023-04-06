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

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await loginUser(auth, loginEmail, loginPassword);
            navigate("/fuelinator"); // Navigate to protected route on successful login
        } catch (error) {
            console.log(error.message);
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
            navigate("/fuelinator"); // Navigate to protected route on successful signup
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="home-container">
            <h1 className="home-heading">Welcome to Fuelinator!</h1>
            <div className="form-container">
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
                        {signupPasswordError && <p className="error-message">Password must be at least 6 characters long</p>}

                    </div>
                    <button type="submit">Login</button>
                </form>
                <hr />
                <form onSubmit={handleSignup}>
                    <h2>Signup</h2>
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
                        {signupPasswordError && <p className="error-message">Password must be at least 6 characters long</p>}
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
