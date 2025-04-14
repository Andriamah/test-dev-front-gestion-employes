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

  async addEmployee(employee: Employe): Promise<Employe> {
    const response = await axios.post(`${BASE_ENDPOINT}`, employee);
    return response.data;
  }

  async updateEmployee(id: string, employee: Employe): Promise<Employe> {
    const response = await axios.put(`${BASE_ENDPOINT}/${id}`, employee);
    return response.data;
  }

  async deleteEmployee(id: string): Promise<void> {
    await axios.delete(`${BASE_ENDPOINT}/${id}`);
  }

  async getEmployee(id: string): Promise<Employe> {
    const response = await axios.get(`${BASE_ENDPOINT}/${id}`);
    // console.log(response.data)
    return response.data.data
  }

}

const employeService = EmployeService.getInstance();
export default employeService;