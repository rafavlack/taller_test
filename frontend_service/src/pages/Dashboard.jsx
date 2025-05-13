import React from 'react';
import {
    PlusCircleIcon,
    ClipboardDocumentListIcon,
    ArrowRightCircleIcon,
    MagnifyingGlassCircleIcon,
    ArrowPathIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const operations = [
    {
        title: 'Registrar Vehículo',
        description: 'Dar de alta un nuevo vehículo en el taller.',
        icon: PlusCircleIcon,
        color: 'bg-green-500 hover:bg-green-600',
        route: '/registrar',
    },
    {
        title: 'Inventario',
        description: 'Ver todos los vehículos registrados en el taller.',
        icon: ClipboardDocumentListIcon,
        color: 'bg-blue-500 hover:bg-blue-600',
        route: '/inventario',
    },
    {
        title: 'Dar Salida',
        description: 'Registrar salida de un vehículo del taller.',
        icon: ArrowRightCircleIcon,
        color: 'bg-yellow-500 hover:bg-yellow-600',
        route: '/salida',
    },
    {
        title: 'Registro Codificado',
        description: 'Buscar vehículos por registro codificado.',
        icon: MagnifyingGlassCircleIcon,
        color: 'bg-purple-500 hover:bg-purple-600',
        route: '/registro_codificado',
    },
    {
        title: 'Reconversión',
        description: 'Reconversión de vehículos eléctricos a gasolina.',
        icon: ArrowPathIcon,
        color: 'bg-red-500 hover:bg-red-600',
        route: '/reconversion',
    },
];

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-300 via-slate-200 to-orange-200 py-10 px-4">
            <div className="flex flex-col items-center mb-12">
                <WrenchScrewdriverIcon className="h-16 w-16 text-indigo-600 mb-4" />
                <h1 className="text-5xl font-extrabold text-indigo-700 text-center">Panel de Operaciones del Taller</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {operations.map((op, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(op.route)}
                        className={`cursor-pointer ${op.color} text-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105`}
                    >
                        <div className="flex items-center mb-4">
                            <op.icon className="h-10 w-10 mr-3" />
                            <h2 className="text-2xl font-semibold">{op.title}</h2>
                        </div>
                        <p className="text-sm">{op.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
