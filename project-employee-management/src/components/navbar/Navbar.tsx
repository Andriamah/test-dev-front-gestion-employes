import React from 'react';
import { Link } from 'react-router-dom';
import logo from "@/assets/images/logo.png";


const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 text-white py-5">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-12 w-12 rounded-lg object-cover shadow-md"
                    />
                    <span className="text-2xl font-bold tracking-wide text-white">
                        STAFF<small>ouille</small>
                    </span>
                </div>


                <div className="flex justify-center items-center space-x-6 text-lg">
                    <a href="#home" className="relative text-lg transition-all duration-200 hover:text-gray-300 hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Home</a>
                    <a href="#about" className="relative text-lg transition-all duration-200 hover:text-gray-300 hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">À propos</a>
                    <a href="#services" className="relative text-lg transition-all duration-200 hover:text-gray-300 hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-gray-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Services</a>
                </div>

                <div className="space-x-4">
                    <Link to="/login" className="hover:text-gray-300">Connexion</Link>
                    <Link to="/signup" className="hover:text-gray-300">Inscription</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
