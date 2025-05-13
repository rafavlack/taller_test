import React, { useState } from 'react';
import {
    IdentificationIcon,
    KeyIcon,
    FireIcon,
    BoltIcon,
    Cog6ToothIcon,
    Battery50Icon,
    WrenchIcon
} from '@heroicons/react/24/outline';
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegistrarVehiculo = () => {
    const [form, setForm] = useState({
        vin: '',
        matricula: '',
        tipoCombustible: '',
        enTaller: true,
        reconvertido: false,
        tipoBombaInyeccion: '',
        voltaje: '',
        corriente: '',
        tipoBateria: '',
        tiposCombustible: [],
    });

    const nomencladores = {
        tipoBomba: ['LINEAL', 'ROTATORIA'],
        tipoBateria: ['GEL', 'LITIO'],
        tiposCombustibleGasolina: ['B83', 'B90', 'B94', 'B100'],
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleMultiSelect = (value) => {
        setForm((prev) => ({
            ...prev,
            tiposCombustible: prev.tiposCombustible.includes(value)
                ? prev.tiposCombustible.filter((v) => v !== value)
                : [...prev.tiposCombustible, value],
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/api/vehiculos', form);
            toast.success('Vehículo registrado correctamente');
            // Resetea el formulario
            setForm({
                vin: '',
                matricula: '',
                tipoCombustible: '',
                enTaller: true,
                reconvertido: false,
                tipoBombaInyeccion: '',
                voltaje: '',
                corriente: '',
                tipoBateria: '',
                tiposCombustible: [],
            });
        } catch (error) {
            console.error('Error al registrar vehículo:', error);

            let mensaje = 'Error al registrar el vehículo';

            if (error.response) {
                const data = error.response.data;

                if (typeof data === 'string') {
                    mensaje = data;
                }

                else if (typeof data === 'object') {
                    mensaje = data.message || data.error || error.response.statusText;
                }
            } else if (error.request) {
                mensaje = 'No se recibió respuesta del servidor';
            } else {
                mensaje = error.message;
            }

            toast.error(mensaje);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 py-10 px-6">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
                <h2 className="text-4xl font-bold text-blue-700 flex items-center gap-2 mb-8">
                    <WrenchIcon className="h-10 w-10 text-blue-600" />
                    Registrar Vehículo
                </h2>

                <form onSubmit={handleSubmit} className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div>
                        <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                            <KeyIcon className="h-5 w-5 text-blue-500" /> Matrícula
                        </label>
                        <input
                            type="text"
                            name="matricula"
                            value={form.matricula}
                            onChange={handleChange}
                            className="w-full p-2 rounded border shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                            <IdentificationIcon className="h-5 w-5 text-blue-500" /> VIN
                        </label>
                        <input
                            type="text"
                            name="vin"
                            value={form.vin}
                            onChange={handleChange}
                            className="w-full p-2 rounded border shadow-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                            <FireIcon className="h-5 w-5 text-orange-500" /> Tipo de Combustible
                        </label>
                        <select
                            name="tipoCombustible"
                            value={form.tipoCombustible}
                            onChange={handleChange}
                            className="w-full p-2 rounded border shadow-sm"
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="DIESEL">Diésel</option>
                            <option value="ELECTRICO">Eléctrico</option>
                            <option value="GASOLINA">Gasolina</option>
                        </select>
                    </div>

                    <div className="flex gap-6 items-center">
                        <label className="flex items-center gap-2 font-medium text-gray-700">
                            <input type="checkbox" name="enTaller" checked={form.enTaller} onChange={handleChange} />
                            En Taller
                        </label>
                    </div>

                    {form.tipoCombustible === 'DIESEL' && (
                        <div>
                            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                                <Cog6ToothIcon className="h-5 w-5 text-gray-700" /> Tipo de Bomba de Inyección
                            </label>
                            <select
                                name="tipoBombaInyeccion"
                                value={form.tipoBombaInyeccion}
                                onChange={handleChange}
                                className="w-full p-2 rounded border shadow-sm"
                                required
                            >
                                <option value="">Seleccione...</option>
                                {nomencladores.tipoBomba.map((tipo) => (
                                    <option key={tipo} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {form.tipoCombustible === 'ELECTRICO' && (
                        <>
                            <div>
                                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                                    <BoltIcon className="h-5 w-5 text-yellow-500" /> Voltaje
                                </label>
                                <input
                                    type="number"
                                    name="voltaje"
                                    value={form.voltaje}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded border shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                                    <BoltIcon className="h-5 w-5 text-yellow-500" /> Corriente
                                </label>
                                <input
                                    type="number"
                                    name="corriente"
                                    value={form.corriente}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded border shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
                                    <Battery50Icon className="h-5 w-5 text-green-500" /> Tipo de Batería
                                </label>
                                <select
                                    name="tipoBateria"
                                    value={form.tipoBateria}
                                    onChange={handleChange}
                                    className="w-full p-2 rounded border shadow-sm"
                                    required
                                >
                                    <option value="">Seleccione...</option>
                                    {nomencladores.tipoBateria.map((tipo) => (
                                        <option key={tipo} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {form.tipoCombustible === 'GASOLINA' && (
                        <div className="col-span-2">
                            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                                <FireIcon className="h-5 w-5 text-red-500" /> Tipos de Combustible
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {nomencladores.tiposCombustibleGasolina.map((tipo) => (
                                    <label key={tipo} className="flex items-center gap-2 text-sm text-gray-800">
                                        <input
                                            type="checkbox"
                                            checked={form.tiposCombustible.includes(tipo)}
                                            onChange={() => handleMultiSelect(tipo)}
                                            className="accent-blue-600"
                                        />
                                        {tipo}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="col-span-2 text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
                        >
                            Registrar Vehículo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrarVehiculo;
