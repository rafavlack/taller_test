import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    HomeIcon,
    PlusCircleIcon,
    ClipboardDocumentListIcon,
    ArrowRightCircleIcon,
    MagnifyingGlassCircleIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

const navItems = [
    { to: '/', label: 'Dashboard', icon: HomeIcon },
    { to: '/registrar', label: 'Registrar', icon: PlusCircleIcon },
    { to: '/inventario', label: 'Inventario', icon: ClipboardDocumentListIcon },
    { to: '/salida', label: 'Dar Salida', icon: ArrowRightCircleIcon },
    { to: '/registro_codificado', label: 'Registro Codificado', icon: MagnifyingGlassCircleIcon },
    { to: '/reconversion', label: 'Reconversión', icon: ArrowPathIcon },
];

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
            <h1 className="text-2xl font-bold text-indigo-700">Taller App</h1>
            <ul className="flex gap-4 items-center">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-1 px-3 py-2 rounded-md font-medium transition ${
                                    isActive
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Icon className="h-5 w-5" />
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
