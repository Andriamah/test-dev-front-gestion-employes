// auth.service.ts
import axios from '@/lib/axios';
import { User } from '@/models/user';
import { AuthResponse } from '@/models/authResponse';
import { RegisterUser } from '@/models/registerUser';

const BASE_ENDPOINT = '/auth'

class AuthService {
    private static instance: AuthService;

    private constructor() { }

    // Singleton pour obtenir une seule instance du service
    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    // Fonction pour effectuer la connexion
    async login(user: User): Promise<string> {
        try {
            const response = await axios.post<AuthResponse>(`${BASE_ENDPOINT}/login`, user)
            console.log("VOICI LA RESPONSE : ", response.data);  // Pour voir si token est sous response.data.token

            if (response.status === 200) {
                const token = response.data.data.token;
                console.log('Token récupéré:', token);
                localStorage.setItem('token', token)
                return token
            } else {
                throw new Error('Échec de la connexion')
            }
        } catch (error: any) {
            throw new Error(error?.message || 'Erreur de connexion')
        }
    }

    async register(user: RegisterUser): Promise<string> {
        try {
          const response = await axios.post(`${BASE_ENDPOINT}/register`, user);
          
          if (response.status === 201) {
            return 'Inscription réussie';
          } else {
            throw new Error('Échec de l\'inscription');
          }
        } catch (error: any) {
          throw new Error(error?.message || 'Erreur lors de l\'inscription');
        }
      }
      
    // Vérifie si l'utilisateur est authentifié
    isAuthenticated(): boolean {
        return !!localStorage.getItem("token");
    }

    // Récupère les informations de l'utilisateur à partir du token
    getUser(): User | null {
        const token = localStorage.getItem("token");
        if (!token) return null;

        // Décode le token (souvent un JWT) pour obtenir les infos utilisateur
        const user: User = JSON.parse(atob(token.split(".")[1]));
        return user;
    }

    // Fonction pour se déconnecter
    logout(): void {
        localStorage.removeItem("token");
    }
}

// auth.service.ts (fin du fichier)
const authService = AuthService.getInstance();
export default authService; // 

