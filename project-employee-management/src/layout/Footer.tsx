import logo from "@/assets/images/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#003366] text-white py-12 px-4 text-center">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Logo Staffouille"
            className="h-16 w-16 rounded-md object-cover shadow-lg"
          />
        </div>

        {/* Titre + description */}
        <h2 className="text-3xl font-bold">STAFFouille — Gestion d'employés</h2>
        <p className="max-w-2xl mx-auto text-lg">
          Une application web moderne pour gérer facilement vos équipes : ajout, modification et suppression d'employés avec une interface simple, fluide et intuitive.
        </p>

        {/* Infos développeuse + projet */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 mt-8 text-lg">
          <div className="space-y-2">
            <p><strong>Développé par :</strong> Elodie ANDRIAMAHANINTSOA</p>
            <p><strong>Email :</strong> andriamahanintsoelo@gmail.com</p>
            <p><strong>Téléphone :</strong> +261 XX XXX XX XX</p>
          </div>
          <div className="space-y-2">
            <p><strong>Projet :</strong> Test Dev Front — ADM Value</p>
            <p><strong>Technos :</strong> React, TypeScript, TailwindCSS</p>
            <p><strong>Année :</strong> 2025</p>
          </div>
        </div>

        {/* Bas de page */}
        <p className="text-base mt-8 opacity-80">
          &copy; {new Date().getFullYear()} STAFFouille — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
