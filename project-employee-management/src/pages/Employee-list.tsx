import Sidebar from "@/layout/Sidebar";

export default function EmployeeListe() {
    return (
      <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Liste des employés</h1>
        {/* Ton contenu ici */}
      </div>
    </div>
    )
  }
  