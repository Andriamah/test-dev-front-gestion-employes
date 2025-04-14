import { Employe } from "./employe";

export interface EmployeeResponse {
    success: boolean;
    data: {
        employees: Employe[];
        total: number;
        page: number;
        totalPages: number;
    };
}