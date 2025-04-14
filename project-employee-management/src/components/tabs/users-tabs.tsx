import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Importation des icônes de Lucide React
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import UserService from "@/services/user.service";
import { IUser } from "@/models/IUser";

const UserTabs: React.FC = () => {
    const [data, setData] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    // Charger les utilisateurs depuis l'API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await UserService.getUsers();
                setData(users);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Définir les colonnes du tableau
    const columns = React.useMemo(
        () => [
            {
                header: "Avatar",
                accessorKey: "id", // Utiliser l'ID ou une autre clé pour l'avatar
                cell: () => (
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                ),
            },
            {
                header: "Nom d'utilisateur",
                accessorKey: "username",
            },
        ],
        []
    );

    // Initialiser la table avec useReactTable
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto border-collapse text-gray-800">
                <thead className="bg-blue-600 text-white">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-6 py-3 text-left border-b border-gray-300 uppercase font-semibold">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-200">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-3 border-b border-gray-200">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-all duration-200 flex items-center space-x-2"
                >
                    <ChevronLeft size={18} /> {/* Icône de flèche gauche */}
                    <span>Précédent</span>
                </button>
                <span className="text-lg font-medium text-gray-700">
                    Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-all duration-200 flex items-center space-x-2"
                >
                    <span>Suivant</span>
                    <ChevronRight size={18} /> {/* Icône de flèche droite */}
                </button>
            </div>
        </div>
    );
};

export default UserTabs;
