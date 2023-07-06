import {BrowserRouter, Route, Routes} from "react-router-dom"

import Form from "./components/Crear/Form"
import Mover from "./components/Mover/Mover"
import Home from "./components/Home"
import Ubicaciones from "./components/Ubicaciones/Ubicaciones"
import Subscribe from "./components/Subscripcion/Subscribe"
import { UbicacionProvider } from "./context/UbicacionContext"
import Conectados from "./components/Conectados/Conectados"

function App() {
  return (
    <UbicacionProvider>
      <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/ubicaciones" element={<Ubicaciones/>}/>
        <Route path="/crear" element={<Form/>}/>
        <Route path="/mover" element={<Mover/>}/>
        <Route path="/subscribir" element={<Subscribe/>}/>
        <Route path="/conectados" element={<Conectados/>}/>
      </Routes>
    </BrowserRouter>
  </UbicacionProvider>
  )
}

export default App
