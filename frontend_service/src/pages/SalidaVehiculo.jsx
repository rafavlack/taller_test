import React, { useState } from 'react';
import axios from 'axios';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalidaVehiculo = () => {
    const [vin, setVin] = useState('');

    const manejarSalida = async () => {
        if (!vin.trim()) {
            toast.error('Debe completar el VIN.');
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:8080/api/vehiculos/salida/${vin}`);
            if (response.status === 200) {
                toast.success('Vehículo dado de salida exitosamente.');
                setVin('');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al dar salida al vehículo.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 p-6">
            <div className="max-w-xl mx-auto bg-white/90 p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-orange-600 flex items-center justify-center gap-2 mb-6">
                    <ArrowRightOnRectangleIcon className="h-8 w-8" />
                    Salida de Vehículo
                </h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="VIN"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        className="w-full p-3 rounded-lg border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        onClick={manejarSalida}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Confirmar Salida
                    </button>
                </div>
            </div>

            {/* Toast container aquí */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default SalidaVehiculo;
