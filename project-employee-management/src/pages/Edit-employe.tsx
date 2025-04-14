import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmployeService from "@/services/employe.service";
import { Employe } from "@/models/employe";
import { toast } from "sonner";
import Sidebar from "@/layout/Sidebar";

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employe>({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    entryDate: new Date(),
  });

  // Fonction utilitaire pour sécuriser le formatage des dates
  const formatDateForInput = (date: Date | string | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (id) {
      EmployeService.getEmployee(id)
        .then((employee) => {
            console.log('Voici ====> ',employee)
          setEmployee({
            lastName: employee.lastName || "",
            firstName: employee.firstName || "",
            dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth) : new Date(),
            entryDate: employee.entryDate ? new Date(employee.entryDate) : new Date(),
          });
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération de l'employé", error)
        );
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await EmployeService.updateEmployee(id, employee);
        toast.success("Modification réussie");
      } else {
        await EmployeService.addEmployee(employee);
        toast.success("Ajout réussie");
      }
      navigate("/gestion-employe");
    } catch (error) {
      toast.error("Erreur lors de la soumission des données");
      console.error("Erreur lors de la soumission des données", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 shadow-lg p-4 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
          Formulaire
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">{id ? "Modifier" : "Ajouter"} un employé</h2>

          <Input
            value={employee.firstName}
            onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
            placeholder="Prénom"
            required
          />

          <Input
            value={employee.lastName}
            onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
            placeholder="Nom"
            required
          />

          <Input
            type="date"
            value={formatDateForInput(employee.dateOfBirth)}
            onChange={(e) =>
              setEmployee({ ...employee, dateOfBirth: new Date(e.target.value) })
            }
            required
          />

          <Input
            type="date"
            value={formatDateForInput(employee.entryDate)}
            onChange={(e) =>
              setEmployee({ ...employee, entryDate: new Date(e.target.value) })
            }
            required
          />

          <Button type="submit" className="w-full">
            {id ? "Modifier" : "Ajouter"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePage;
