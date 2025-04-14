import axios from '@/lib/axios';
import { Employe } from '@/models/employe';

const BASE_ENDPOINT = '/employees';

// Interface pour les paramètres de recherche
export interface EmployeeSearchParams {
  page?: number;
  firstName?: string;
  lastName?: string;
  // Vous pouvez ajouter d'autres paramètres selon vos besoins
}


class EmployeService {
  private static instance: EmployeService;

  private constructor() { }

  static getInstance(): EmployeService {
    if (!EmployeService.instance) {
      EmployeService.instance = new EmployeService();
    }
    return EmployeService.instance;
  }

  
  
  async getEmployees(params: EmployeeSearchParams = { page: 0 }): Promise<Employe[]> {
    try {
      const queryParams = new URLSearchParams();
  
      if (params.page !== undefined) queryParams.append('page', params.page.toString());
      if (params.firstName) queryParams.append('firstName', params.firstName);
      if (params.lastName) queryParams.append('lastName', params.lastName);
  
      const url = `${BASE_ENDPOINT}?${queryParams.toString()}`;
      // console.log('voici URL ', url)
      const response = await axios.get(url);
  
      return response.data.data.items;
    } catch (error) {
      console.error("Erreur lors de la récupération des employés", error);
      throw error;
    }
  }
  
}

const employeService = EmployeService.getInstance();
export default employeService;