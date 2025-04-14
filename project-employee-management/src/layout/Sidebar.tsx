import { Link, useLocation } from "react-router-dom"
import { LogOut, Users, Home } from "lucide-react"

const Sidebar = () => {
  const location = useLocation()

  const menu = [
    { label: "Accueil", icon: <Home className="w-5 h-5" />, to: "/" },
    { label: "Employés", icon: <Users className="w-5 h-5" />, to: "/gestion-employes" },
    { label: "Utilisateurs", icon: <Users className="w-5 h-5" />, to: "/user-list" },

    // Ajoute d'autres items si nécessaire
    
  ]

  return (
    <aside className="w-64 h-screen bg-[#003366] text-white flex flex-col p-4 space-y-2 shadow-md">
      <div className="text-2xl font-bold mb-6">STAFFouille</div>
      {menu.map((item, i) => (
        <Link
          key={i}
          to={item.to}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 transition ${
            location.pathname === item.to ? "bg-blue-800" : ""
          }`}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}

      <div className="mt-auto">
        <button
          onClick={() => {
            localStorage.removeItem("token")
            window.location.href = "/" // ou utiliser navigate()
          }}
          className="w-full flex items-center gap-3 px-4 py-2 mt-4 rounded bg-red-600 hover:bg-red-700 transition"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
