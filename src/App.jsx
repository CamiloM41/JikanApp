import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';

//Componentes
import Coleccion from "./Components/Coleccion"
import Favoritos from "./Components/Favoritos"
import Info from "./Components/Info"
import Inicio from "./Components/Inicio"
import Usuario from "./Components/Usuario"
import Anime from "./Components/Anime"
import Top from "./Components/Top"
import Manga from "./Components/Manga"
import People from "./Components/People"
import Character from "./Components/Character"

import './App.css'

function App() {
  const claseActiva = ({ isActive }) => (isActive ? 'activo' : '')

  return (
    <>
      <Router>
        <header className="cabecera">
          <div className="cabecera-marca">
            <Link to="/" className="logo">freaku</Link>
          </div>

          <nav className="menu">
            <NavLink to="/" end className={claseActiva}>Inicio</NavLink>
            <NavLink to="/coleccion" className={claseActiva}>Coleccion</NavLink>
            <NavLink to="/favoritos" className={claseActiva}>Favoritos</NavLink>
            <NavLink to="/info" className={claseActiva}>Info</NavLink>
            {/*<NavLink to="/usuario" className={claseActiva}>Usuario</NavLink>*/}
            <NavLink to="/top" className={claseActiva}>Top</NavLink>
          </nav>
        </header>

        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/coleccion" element={<Coleccion />} />
            <Route path="/info" element={<Info />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/top" element={<Top />} />
            <Route path="/anime/:name" element={<Anime />} />
            <Route path='/manga/:name' element={<Manga/>}/>
            <Route path='/people/:name' element={<People/>}/>
            <Route path='/character/:name' element={<Character/>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App