import Navbar from "./components/Navbar"
import { BrowserRouter, Route } from "react-router"
import LevelsPage from "./pages/LevelsPage"

function App() {

  return (
    <div className="flex flex-col w-full h-full bg-stone-900">
      <Navbar />
        <div className="flex flex-col max-width-[1280] h-full w-full">
          <BrowserRouter>
            <Route path="/" element={<LevelsPage />}/>
          </BrowserRouter>
        </div>
    </div>
  )
}

export default App
