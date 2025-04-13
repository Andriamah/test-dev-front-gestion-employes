import React from 'react';
import { useState } from "react"

import { Link } from 'react-router-dom';
import logo from "@/assets/images/logo.png";
import AuthDialog from "@/components/authDialog/AuthDialog"
import { Button } from "@/components/ui/button"

const Navbar: React.FC = () => {
    const [authDialogOpen, setAuthDialogOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false) // à gérer via contexte ou localStorage/token plus tard

    const handleLogout = () => {
        // Supprime le token ou reset ton auth context ici
        setIsAuthenticated(false)
        localStorage.removeItem("token")
    }
    return (
        <nav className="bg-[#003366] text-white py-5">
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
                    <Link to="/gestion-employes">Gestion des Employés</Link>

                </div>

                <div className="space-x-4">
                    {!isAuthenticated ? (
                        <Button variant="ghost" onClick={() => setAuthDialogOpen(true)}>
                            Connexion / Inscription
                        </Button>
                    ) : (
                        <Button variant="ghost" onClick={handleLogout}>
                            Se déconnecter
                        </Button>
                    )}
                </div>

                {/* AuthDialog */}
                <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />            </div>
        </nav>
    );
};

export default Navbar;
