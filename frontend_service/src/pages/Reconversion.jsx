import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ArrowPathIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const RegistroReconversion = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchVehiculos = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8080/api/vehiculos');
            const vehiculosReconvertidos = response.data.filter(v => v.reconvertido);
            setVehiculos(vehiculosReconvertidos);
        } catch (err) {
            console.error('Error al obtener vehículos:', err);
            setError('No se pudo cargar la información de reconversión.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehiculos();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-center text-indigo-700 flex items-center justify-center gap-2 mb-6">
                    <ArrowPathIcon className="h-8 w-8" />
                    Vehículos Reconvertidos
                </h2>

                {error && (
                    <div className="text-red-600 text-center mb-4 flex items-center justify-center gap-2">
                        <ExclamationTriangleIcon className="h-5 w-5" />
                        {error}
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-600">Cargando vehículos...</p>
                ) : vehiculos.length === 0 ? (
                    <p className="text-center text-gray-500">No hay vehículos reconvertidos.</p>
                ) : (
                    <div className="space-y-4">
                        {vehiculos.map((v) => (
                            <div
                                key={v.id}
                                className="border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm"
                            >
                                <p className="text-sm text-gray-600">
                                    <strong className="text-gray-800">Matrícula:</strong> {v.matricula}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong className="text-gray-800">Tipo original: ELECTRICO</strong>
                                </p>
                                <p className="text-sm text-indigo-700">
                                    <strong>Reconvertido a:</strong> {v.tipoCombustible}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistroReconversion;
