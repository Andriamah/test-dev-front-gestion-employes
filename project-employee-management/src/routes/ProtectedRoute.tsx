import { Navigate, useLocation } from "react-router-dom"
import { toast } from "sonner"
import { useEffect, useRef } from "react"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token")
  const hasShownToast = useRef(false)
  const location = useLocation()

  useEffect(() => {
    if (!token && !hasShownToast.current) {
      hasShownToast.current = true
      toast.error("Veuillez vous connecter d'abord")
    }
  }, [token, location.pathname])

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
