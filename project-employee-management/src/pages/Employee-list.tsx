import EmployeTabs from "@/components/tabs/employe.tabs";
import Sidebar from "@/layout/Sidebar";

export default function EmployeeListe() {
  return (
    <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 shadow-lg p-4 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
                    Liste des employés
                </h1>

                <EmployeTabs />

            </div>
        </div>
  )
}
