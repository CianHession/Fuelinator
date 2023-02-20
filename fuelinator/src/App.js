import { Routes, Route, Router } from 'react-router-dom';
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/dashboard">
                    <Navbar />
                    <Dashboard />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;