import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

//Componentes
import Coleccion from "./Components/Coleccion/"
import Favoritos from "./Components/Favoritos/"
import Info from "./Components/Info/"
import Inicio from "./Components/Inicio/"
import Usuario from "./Components/Usuario/"
import Anime from "./Components/"
import Top from "./Components/Top/"
import Manga from "./Components/Manga/"

import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/coleccion" element={<Coleccion />} />
          <Route path="/info" element={<Info />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/top" element={<Top />} />
          <Route path="/anime/:name" element={<Anime />} />
          <Route path='/manga/:name' element={<Manga/>}/>
        </Routes>

        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/coleccion">Coleccion</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/info">Info</Link>
          <Link to="/usuario">Usuario</Link>
          <Link to="/top">Top</Link>
        </nav>
      </Router>
    </>
  )
}

export default App