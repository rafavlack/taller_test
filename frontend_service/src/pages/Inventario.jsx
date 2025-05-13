import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    WrenchIcon,
    MagnifyingGlassIcon,
    TruckIcon,
    BoltIcon,
    FireIcon,
    ArrowRightOnRectangleIcon,
    ExclamationTriangleIcon,
    ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inventario = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [vinSeleccionado, setVinSeleccionado] = useState(null);
    const [vinParaReconversion, setVinParaReconversion] = useState(null);
    const [combustibleBase, setCombustibleBase] = useState('');
    const [tiposGasolina, setTiposGasolina] = useState([]);

    const fetchVehiculos = async () => {
        setLoading(true);
        setError('');
        try {
            const params = tipoFiltro && tipoFiltro !== 'TODOS' ? { tipo: tipoFiltro } : {};
            const response = await axios.get('http://localhost:8080/api/vehiculos', { params });
            setVehiculos(response.data);
        } catch (error) {
            console.error('Error al obtener inventario:', error);
            setError('Error al cargar el inventario.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehiculos();
    }, [tipoFiltro]);

    const confirmarSalida = async () => {
        if (!vinSeleccionado) return;
        try {
            await axios.patch(`http://localhost:8080/api/vehiculos/salida/${vinSeleccionado}`);
            toast.success('Vehículo dado de salida exitosamente.');
            setVinSeleccionado(null);
            await fetchVehiculos();
        } catch (error) {
            console.error('Error al dar salida al vehículo:', error);
            toast.error('No se pudo dar salida al vehículo.');
        }
    };

    const confirmarReconversion = async () => {
        if (!vinParaReconversion || !combustibleBase) return;

        const payload = [combustibleBase];
        if (combustibleBase === 'GASOLINA') {
            payload.push(...tiposGasolina);
        }

        try {
            await axios.post(`http://localhost:8080/api/vehiculos/${vinParaReconversion}/reconversion`, payload);
            toast.success('Vehículo reconvertido exitosamente.');
            setVinParaReconversion(null);
            setCombustibleBase('');
            setTiposGasolina([]);
            await fetchVehiculos();
        } catch (error) {
            console.error('Error en reconversión:', error);
            toast.error('No se pudo realizar la reconversión.');
        }
    };

    const toggleTipoGasolina = (tipo) => {
        if (tiposGasolina.includes(tipo)) {
            setTiposGasolina(tiposGasolina.filter(t => t !== tipo));
        } else {
            setTiposGasolina([...tiposGasolina, tipo]);
        }
    };

    const getIcon = (tipo) => {
        switch (tipo) {
            case 'DIESEL': return <TruckIcon className="h-6 w-6 text-gray-700" />;
            case 'ELECTRICO': return <BoltIcon className="h-6 w-6 text-yellow-500" />;
            case 'GASOLINA': return <FireIcon className="h-6 w-6 text-red-500" />;
            default: return <WrenchIcon className="h-6 w-6 text-blue-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-6 relative">
            <div className="max-w-6xl mx-auto bg-white/90 p-8 rounded-2xl shadow-xl">
                <h2 className="text-4xl font-bold text-center text-orange-600 flex items-center justify-center gap-2 mb-6">
                    <MagnifyingGlassIcon className="h-8 w-8" />
                    Inventario de Vehículos
                </h2>

                <div className="mb-6 flex justify-center gap-4 flex-wrap">
                    {['TODOS', 'DIESEL', 'ELECTRICO', 'GASOLINA'].map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => setTipoFiltro(tipo)}
                            className={`px-5 py-2 rounded-xl font-semibold shadow-md transition ${
                                tipoFiltro === tipo
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-white border border-orange-400 text-orange-600'
                            }`}
                        >
                            {tipo === 'TODOS' ? 'Todos' : tipo}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="text-red-600 text-center mb-4 flex items-center justify-center gap-2">
                        <ExclamationTriangleIcon className="h-5 w-5" />
                        {error}
                    </div>
                )}

                {loading ? (
                    <p className="text-center text-gray-600">Cargando vehículos...</p>
                ) : vehiculos.length === 0 ? (
                    <p className="text-center text-gray-600">No hay vehículos en el inventario.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehiculos.map((v) => (
                            <div
                                key={v.id}
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-semibold text-gray-700">
                                            {v.matricula}
                                        </h3>
                                        {getIcon(v.tipoCombustible)}
                                    </div>
                                    <p className="text-sm text-gray-600">VIN: {v.vin}</p>
                                    <p className="text-sm text-gray-600">Tipo: {v.tipoCombustible}</p>
                                    {v.tipoCombustible === 'DIESEL' && (
                                        <p className="text-sm text-gray-600">Bomba: {v.tipoBombaInyeccion}</p>
                                    )}
                                    {v.tipoCombustible === 'ELECTRICO' && (
                                        <>
                                            <p className="text-sm text-gray-600">Voltaje: {v.voltaje}V</p>
                                            <p className="text-sm text-gray-600">Corriente: {v.corriente}A</p>
                                            <p className="text-sm text-gray-600">Batería: {v.tipoBateria}</p>
                                        </>
                                    )}
                                    {v.tipoCombustible === 'GASOLINA' && (
                                        <p className="text-sm text-gray-600">
                                            Combustibles: {v.tiposCombustible?.join(', ')}
                                        </p>
                                    )}
                                    {v.reconvertido && (
                                        <p className="text-sm text-blue-700 font-medium mt-2">
                                            Reconvertido a: {v.reconversionCombustible}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => setVinSeleccionado(v.vin)}
                                        className="text-orange-600 hover:text-red-600 transition flex items-center gap-1"
                                        title="Dar salida"
                                    >
                                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                        <span className="text-sm font-medium">Salida</span>
                                    </button>

                                    {v.tipoCombustible === 'ELECTRICO' && (
                                        <button
                                            onClick={() => setVinParaReconversion(v.vin)}
                                            className="text-green-600 hover:text-green-800 transition text-sm font-medium"
                                            title="Reconversión"
                                        >
                                            <ArrowsRightLeftIcon className="h-5 w-5 inline-block" /> Reconversión
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {vinSeleccionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full space-y-4 text-center">
                        <ExclamationTriangleIcon className="h-10 w-10 text-orange-500 mx-auto" />
                        <h3 className="text-lg font-semibold text-gray-800">¿Dar salida al vehículo?</h3>
                        <p className="text-sm text-gray-600">VIN: <span className="font-mono">{vinSeleccionado}</span></p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={confirmarSalida}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => setVinSeleccionado(null)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {vinParaReconversion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full text-center space-y-4">
                        <ArrowsRightLeftIcon className="h-10 w-10 text-green-600 mx-auto" />
                        <h3 className="text-lg font-semibold text-gray-800">Reconversión de Vehículo Eléctrico</h3>
                        <p className="text-sm text-gray-600">VIN: <span className="font-mono">{vinParaReconversion}</span></p>

                        <div className="flex flex-col gap-2 items-start">
                            {['DIESEL', 'GASOLINA'].map((tipo) => (
                                <label key={tipo} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="combustibleBase"
                                        value={tipo}
                                        checked={combustibleBase === tipo}
                                        onChange={() => {
                                            setCombustibleBase(tipo);
                                            setTiposGasolina([]);
                                        }}
                                    />
                                    {tipo}
                                </label>
                            ))}
                        </div>

                        {combustibleBase === 'GASOLINA' && (
                            <div className="mt-2 text-left">
                                <p className="text-sm text-gray-600 mb-1 font-semibold">Tipos de gasolina:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {['B83', 'B90', 'B94', 'B100'].map((tipo) => (
                                        <label key={tipo} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={tiposGasolina.includes(tipo)}
                                                onChange={() => toggleTipoGasolina(tipo)}
                                            />
                                            {tipo}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={confirmarReconversion}
                                disabled={!combustibleBase}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => {
                                    setVinParaReconversion(null);
                                    setCombustibleBase('');
                                    setTiposGasolina([]);
                                }}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventario;
