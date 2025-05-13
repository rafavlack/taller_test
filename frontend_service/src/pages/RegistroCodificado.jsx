import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ExclamationTriangleIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const RegistroCodificado = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchVehiculos = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8080/api/vehiculos');
            setVehiculos(response.data);
        } catch (err) {
            console.error('Error al obtener vehículos:', err);
            setError('No se pudo cargar la información del inventario.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehiculos();
    }, []);

    const obtenerRegistroCodificado = (vehiculo) => {
        const { tipoCombustible, matricula, tipoBombaInyeccion, vin, voltaje, corriente, tipoBateria, tiposCombustible } = vehiculo;

        switch (tipoCombustible) {
            case 'DIESEL':
                return `${matricula} + ${tipoBombaInyeccion}`;
            case 'ELECTRICO':
                return `${vin} + ${voltaje}V + ${corriente}A + ${tipoBateria}`;
            case 'GASOLINA':
                return `${matricula} + ${tiposCombustible?.join(', ')}`;
            default:
                return 'Tipo desconocido';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-center text-blue-700 flex items-center justify-center gap-2 mb-6">
                    <ClipboardDocumentListIcon className="h-8 w-8" />
                    Registro Codificado de Vehículos
                </h2>

                {error && (
                    <div className="text-red-600 text-center mb-4 flex items-center justify-center gap-2">
                        <ExclamationTriangleIcon className="h-5 w-5" />
                        {error}
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-600">Cargando registros...</p>
                ) : vehiculos.length === 0 ? (
                    <p className="text-center text-gray-500">No hay vehículos en el inventario.</p>
                ) : (
                    <div className="space-y-4">
                        {vehiculos.map((vehiculo) => (
                            <div
                                key={vehiculo.id}
                                className="border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm"
                            >
                                <p className="text-sm text-gray-600">
                                    <strong className="text-gray-800">Matrícula:</strong> {vehiculo.matricula}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong className="text-gray-800">Tipo:</strong> {vehiculo.tipoCombustible}
                                </p>
                                <p className="text-sm text-blue-700 mt-1">
                                    <strong>Registro:</strong> {obtenerRegistroCodificado(vehiculo)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistroCodificado;
