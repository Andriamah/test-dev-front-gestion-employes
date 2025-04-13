import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Home from "./pages/Home"
import FeedbackButton from "./components/feedbackButton/FeedbackButton"
import EmployeeListe from "./pages/Employee-list"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative">
        <Header />
        <main className="min-h-screen flex flex-col pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gestion-employes" element={<EmployeeListe />} />

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