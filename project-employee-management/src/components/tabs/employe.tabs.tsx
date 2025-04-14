import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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

const EmployeTabs: React.FC = () => {
    const [data, setData] = useState<Employe[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);

    const [firstNameFilter, setFirstNameFilter] = useState("");
    const [lastNameFilter, setLastNameFilter] = useState("");

    // Delay pour éviter trop de requêtes
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchEmployees();
        }, 300); // debounce 300ms

        return () => clearTimeout(timeout);
    }, [pageIndex, firstNameFilter, lastNameFilter]);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await employeService.getEmployees({
                page: pageIndex,
                firstName: firstNameFilter,
                lastName: lastNameFilter
            });

            setData(response);
        } catch (error) {
            console.error("Erreur lors du chargement des employés", error);
        } finally {
            setLoading(false);
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
                        <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => console.log("Voir", employee)}
                        >
                            <Eye size={18} />
                        </button>
                        <button
                            className="text-green-600 hover:text-green-800"
                            onClick={() => console.log("Modifier", employee)}
                        >
                            <Pencil size={18} />
                        </button>
                        <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => console.log("Supprimer", employee)}
                        >
                            <Trash2 size={18} />
                        </button>
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
        pageCount: -1, // backend
    });

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-semibold text-center mb-6 text-blue-700">Liste des employés</h1>

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
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-3 text-left border-b uppercase font-semibold">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={columns.length} className="text-center py-6">Chargement...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={columns.length} className="text-center py-6">Aucun employé trouvé.</td></tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-50 transition">
                                    {row.getVisibleCells().map(cell => (
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
                <button
                    onClick={() => setPageIndex(old => Math.max(old - 1, 0))}
                    disabled={pageIndex === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 flex items-center gap-2"
                >
                    <ChevronLeft size={18} />
                    Précédent
                </button>
                <span className="text-gray-700">Page {pageIndex + 1}</span>
                <button
                    onClick={() => setPageIndex(old => old + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                >
                    Suivant
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default EmployeTabs;
