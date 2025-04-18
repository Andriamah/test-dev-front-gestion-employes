import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Home from "./pages/Home"
import FeedbackButton from "./components/feedbackButton/FeedbackButton"
import EmployeeListe from "./pages/Employee-list"
import { Toaster } from "sonner"
import ProtectedRoute from "./routes/ProtectedRoute"
import UserList from "./pages/User-list"
import EditEmploye from "./pages/Edit-employe"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative">
        <Header />
        <Toaster />
        <main className="min-h-screen flex flex-col pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/gestion-employes"
              element={
                <ProtectedRoute>
                  <EmployeeListe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-list"
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-list"
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
            {/* Ajout d’un employé */}
            <Route path="/employees/add" element={
              <ProtectedRoute>
                <EditEmploye />
              </ProtectedRoute>} />

            {/* Édition d’un employé */}
            <Route path="/edit-employe/:id" element={
              <ProtectedRoute>
                <EditEmploye />
              </ProtectedRoute>} />


            {/* Autres routes */}
          </Routes>
        </main>

        <Footer />

        {/* ✅ Ici ton bouton de feedback, pas dans <Footer /> */}
        <FeedbackButton />
      </div>
    </BrowserRouter>


  )
}


export default App