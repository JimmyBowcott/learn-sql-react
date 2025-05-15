import { BrowserRouter, Routes, Route } from "react-router"
import LevelsPage from "./pages/LevelsPage"
import SignInPage from "./pages/SignInPage"
import AboutPage from "./pages/About"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LevelsPage/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
