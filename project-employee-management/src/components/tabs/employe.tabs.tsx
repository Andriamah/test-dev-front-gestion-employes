import React, { useEffect, useState } from "react";
import {
  Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Plus
} from "lucide-react";
import { Employe } from "@/models/employe";
import employeService from "@/services/employe.service";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const EmployeTabs: React.FC = () => {
  const [data, setData] = useState<Employe[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState<Employe | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchEmployees();
    }, 300);
    return () => clearTimeout(timeout);
  }, [pageIndex, firstNameFilter, lastNameFilter]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeService.getEmployees({
        page: pageIndex,
        firstName: firstNameFilter,
        lastName: lastNameFilter,
      });
      setData(response);
    } catch (error) {
      console.error("Erreur lors du chargement des employés", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedEmployee) {
      try {
        await employeService.deleteEmployee(selectedEmployee.id!);
        fetchEmployees();
      } catch (err) {
        console.error("Erreur suppression :", err);
      } finally {
        setShowDeleteDialog(false);
      }
    }
  };

  const columns: ColumnDef<Employe>[] = [
    { header: "Prénom", accessorKey: "firstName" },
    { header: "Nom", accessorKey: "lastName" },
    {
      header: "Date de naissance",
      accessorKey: "dateOfBirth",
      cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    },
    {
      header: "Date d'entrée",
      accessorKey: "entryDate",
      cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedEmployee(employee);
                setShowViewDialog(true);
              }}
            >
              <Eye size={18} className="text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(`/edit-employe/${employee.id}`)}
            >
              <Pencil size={18} className="text-green-600" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedEmployee(employee);
                setShowDeleteDialog(true);
              }}
            >
              <Trash2 size={18} className="text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { pagination: { pageIndex, pageSize: 5 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: -1,
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-700">
          Liste des employés
        </h1>
        <Button
          onClick={() => navigate("/employees/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          Ajouter un employé
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
        <Input
          placeholder="Filtrer par prénom"
          value={firstNameFilter}
          onChange={(e) => setFirstNameFilter(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Filtrer par nom"
          value={lastNameFilter}
          onChange={(e) => setLastNameFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-sm text-gray-800">
          <thead className="bg-blue-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-left border-b uppercase font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">Chargement...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">Aucun employé trouvé.</td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 border-b">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Précédent
        </Button>
        <span className="text-gray-700">Page {pageIndex + 1}</span>
        <Button
          onClick={() => setPageIndex((old) => old + 1)}
          className="flex items-center gap-2"
        >
          Suivant
          <ChevronRight size={18} />
        </Button>
      </div>

      {/* Dialog Voir */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg space-y-4">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-semibold text-gray-800">Détails de l'employé</DialogTitle>
            <DialogDescription className="text-lg text-gray-600">
              {selectedEmployee ? (
                <div className="space-y-3 mt-4">
                  <p className="text-base font-medium text-gray-700">
                    <strong>Prénom :</strong> {selectedEmployee.firstName}
                  </p>
                  <p className="text-base font-medium text-gray-700">
                    <strong>Nom :</strong> {selectedEmployee.lastName}
                  </p>
                  <p className="text-base font-medium text-gray-700">
                    <strong>Date de naissance :</strong> {new Date(selectedEmployee.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p className="text-base font-medium text-gray-700">
                    <strong>Date d'entrée :</strong> {new Date(selectedEmployee.entryDate).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Aucune donnée</p>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


      {/* Dialog Supprimer */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer {selectedEmployee?.firstName} {selectedEmployee?.lastName} ?
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Supprimer
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeTabs;
