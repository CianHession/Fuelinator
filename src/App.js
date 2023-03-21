import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Fuelinator from './Fuelinator';
import About from './About';
import Navbar from './Navbar';

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Fuelinator />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App