import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Fuelinator from './Fuelinator';
import About from './About';
import Navbar from './Navbar';
import Home from './Home';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<RedirectHome />} />
                <Route path="/fuelinator" element={<Fuelinator />} canActivate={[authMiddleware]} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

const authMiddleware = (req, res, next) => {
    if (!localStorage.getItem('isAuthenticated')) { // Check for authentication flag
        res.redirect('/');
    } else {
        next();
    }
}

const RedirectHome = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
        return <Navigate to="/fuelinator" replace />;
    } else {
        return <Home />;
    }
};

export default App;