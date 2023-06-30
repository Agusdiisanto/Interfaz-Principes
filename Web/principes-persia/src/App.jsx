import {BrowserRouter, Route, Routes} from "react-router-dom"

import Form from "./components/Crear/Form"
import Home from "./components/Home"
import Ubicaciones from "./components/Ubicaciones"
import Subscribe from "./components/Subscripcion/Subscribe"

function App() {
  return (
    <BrowserRouter>
    <Routes> 
      <Route path="/" element={<Home/>}/>
      <Route path="/ubicaciones" element={<Ubicaciones/>}/>
      <Route path="/crear" element={<Form/>}/>
      <Route path="/subscribir" element={<Subscribe/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
