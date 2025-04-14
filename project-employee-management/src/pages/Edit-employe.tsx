import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeService from "@/services/employe.service";
import { toast } from "sonner";
import Sidebar from "@/layout/Sidebar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employe } from "@/models/employe";

// Schéma de validation Zod
const employeeSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  dateOfBirth: z.string().refine((val) => new Date(val) <= new Date(), {
    message: "La date de naissance ne peut pas être dans le futur",
  }),
  entryDate: z.string().refine((val) => new Date(val) <= new Date(), {
    message: "La date d'entrée ne peut pas être dans le futur",
  }),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employe | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      entryDate: "",
    },
  });


  useEffect(() => {
    if (id && !employee) {
      console.log("C'est un MODIF");

      EmployeService.getEmployee(id)
        .then((employeeData) => {
          setEmployee(employeeData);
          console.log("Données de l'employé récupérées :", employeeData);

          reset({
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            dateOfBirth: new Date(employeeData.dateOfBirth).toISOString().split("T")[0],
            entryDate: new Date(employeeData.entryDate).toISOString().split("T")[0],
          });
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération de l'employé", error)
        );
    }
  }, [id, employee, reset]);



  const onSubmit = async (data: EmployeeFormData) => {
    try {
      const payload = {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        entryDate: new Date(data.entryDate),
      };

      if (id) {
        await EmployeService.updateEmployee(id, payload);
        toast.success("Modification réussie");
      } else {
        await EmployeService.addEmployee(payload);
        toast.success("Ajout réussie");
      }

      navigate("/gestion-employes");
    } catch (error: any) {
      const res = error.response?.data;
      const generalMessage = res?.message || error.message || "Une erreur est survenue";
      const details = res?.data
        ? Object.values(res.data).join('\n')
        : null;
      toast.error(`${generalMessage}${details ? ':\n' + details : ''}`);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 shadow-lg p-4 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
          Formulaire
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">{id ? "Modifier" : "Ajouter"} un employé</h2>

          <div>
            <input
              type="text"
              placeholder="Prénom"
              {...register("firstName")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Nom"
              {...register("lastName")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              {...register("entryDate")}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.entryDate && (
              <p className="text-red-500 text-sm">{errors.entryDate.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {id ? "Modifier" : "Ajouter"}
          </button>
        </form>


      </div>
    </div>
  );
};

export default EditEmployeePage;
