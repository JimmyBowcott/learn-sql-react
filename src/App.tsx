import { BrowserRouter, Routes, Route } from "react-router"
import LevelsPage from "./pages/LevelsPage"
import SignInPage from "./pages/SignInPage"
import AboutPage from "./pages/About"
import Homepage from "./pages/Homepage"
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/levels" element={<LevelsPage />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
