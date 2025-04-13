import React from 'react';
import heroImage from "@/assets/images/heroimage.png";

const HeroImage: React.FC = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat animate-fade-down pt-0" // Utilisation de Tailwind pour marginTop
      style={{ backgroundImage: `url(${heroImage})` }} // L'image de fond est appliquée via style car c'est spécifique à l'URL
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-center px-4">
        <h2 className="text-white text-4xl font-bold animate-slide-in-left mb-4">
          Bienvenue sur notre STAFFouille
        </h2>
        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed max-w-3xl">
          Gérez vos équipes de manière professionnelle, tout en profitant de l'interface simple et agréable de STAFFouille.
          Optimisez chaque action, de manière rapide et fluide.
        </h3>
        <p className="text-white text-lg mt-6">Bonne navigation !</p>
      </div>
    </section>
  );
};

export default HeroImage;
