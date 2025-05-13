import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegistrarVehiculo from './pages/RegistrarVehiculo';
import Navbar from './component/NavBar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Inventario from "./pages/Inventario.jsx";
import SalidaVehiculo from "./pages/SalidaVehiculo.jsx";
import RegistroCodificado from "./pages/RegistroCodificado.jsx";
import Reconversion from "./pages/Reconversion.jsx";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/registrar" element={<RegistrarVehiculo />} />
                <Route path="/inventario" element={<Inventario />} />
                <Route path="/salida" element={<SalidaVehiculo />} />
                <Route path="/registro_codificado" element={<RegistroCodificado />} />
                <Route path="/reconversion" element={<Reconversion />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default App;
