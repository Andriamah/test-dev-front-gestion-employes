import axios from '@/lib/axios';
// import { IUser } from '@/models/Iuser';
import { IUser } from '@/models/IUser';

const BASE_ENDPOINT = '/users';

class UserService {

  private static instance: UserService;

  private constructor() { }

  // Singleton pour obtenir une seule instance du service
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // Méthode pour récupérer les utilisateurs (avec typage User[])
  async getUsers(): Promise<IUser[]> {
    try {
      const response = await axios.get(`${BASE_ENDPOINT}`);
      return response.data.data; // Retourne un tableau de utilisateurs (User[])
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      throw error;
    }
  }
}

// Obtenir l'instance du service
const userService = UserService.getInstance();

// Exporter le service
export default userService;
