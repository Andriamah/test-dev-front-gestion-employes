import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from "@/assets/images/logo.png";
import AuthDialog from "@/components/authDialog/AuthDialog";
import { Button } from "@/components/ui/button";
import authService from '@/services/auth.service';

const Navbar: React.FC = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate("/"); // redirige vers la page d’accueil
  };

  useEffect(() => {
    // Met à jour l'état quand le token change (au cas où)
    const handleStorageChange = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
          <a href="#home" className="relative hover:text-gray-300">Home</a>
          <a href="#about" className="relative hover:text-gray-300">À propos</a>
          <a href="#services" className="relative hover:text-gray-300">Services</a>
          <Link to="/gestion-employes" className="relative hover:text-gray-300">Gestion des Employés</Link>
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
        <AuthDialog
          open={authDialogOpen}
          onOpenChange={(open) => {
            setAuthDialogOpen(open);
            setIsAuthenticated(authService.isAuthenticated());
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
