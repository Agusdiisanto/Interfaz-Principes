import {BrowserRouter, Route, Routes} from "react-router-dom"

import Form from "./components/Form"
import Home from "./components/Home"
import Ubicaciones from "./components/Ubicaciones"

function App() {
  return (
    <BrowserRouter>
    <Routes> 
      <Route path="/" element={<Home/>}/>
      <Route path="/ubicaciones" element={<Ubicaciones/>}/>
      <Route path="/crear" element={<Form/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
