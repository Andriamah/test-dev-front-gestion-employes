import HeroImage from "@/components/heroimage/HeroImage";
import { UserPlus, PencilLine, Trash2 } from 'lucide-react';
import about from "@/assets/images/about.png";



const Home: React.FC = () => {
    return (
        <div className="w-full overflow-x-hidden">
            <section id="home">
                <HeroImage />
            </section>

            {/* Section About */}
            <section id="about" className="bg-gray-100 py-10 text-center flex items-center justify-between">
                <div className="w-1/2">
                    <img src={about} alt="Description de l'image à gauche" className="w-full h-auto" />
                </div>

                <div className="w-1/2 text-left px-8">
                    <h2 className="text-3xl font-bold text-[#002B5B]">À propos de nous</h2>
                    <p className="mt-6 text-lg leading-relaxed text-gray-700">
                        Bienvenue sur <strong>STAFFouille</strong>, votre plateforme de gestion d'employés simple, moderne et efficace.
                        <br />
                        Grâce à notre interface intuitive, vous pouvez facilement <strong>ajouter</strong>, <strong>modifier</strong> ou <strong>supprimer</strong> des informations relatives à vos collaborateurs, tout en gardant une vue claire sur votre équipe.
                        <br /><br />
                        Notre objectif ? Vous offrir une expérience fluide pour mieux gérer votre entreprise au quotidien.
                        <br />
                        Pour accéder à toutes les fonctionnalités, nous vous invitons à <strong>vous inscrire</strong> ou à <strong>vous connecter</strong> dès maintenant.
                    </p>
                </div>
            </section>




            {/* Section Services */}

            <section id="services" className="bg-white py-25 px-4 text-center">
                <h2 className="text-3xl font-bold text-[#002B5B] mb-12">Nos Services</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
                        <div className="mb-4 flex justify-center">
                            <UserPlus className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Ajout d'employé</h3>
                        <p className="text-gray-600">Ajoutez facilement de nouveaux employés avec toutes leurs informations, en quelques clics.</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
                        <div className="mb-4 flex justify-center">
                            <PencilLine className="w-12 h-12 text-yellow-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Modification</h3>
                        <p className="text-gray-600">Mettez à jour les informations des employés rapidement, sans prise de tête.</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
                        <div className="mb-4 flex justify-center">
                            <Trash2 className="w-12 h-12 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Suppression</h3>
                        <p className="text-gray-600">Supprimez les profils obsolètes tout en gardant un historique clair et sécurisé.</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
