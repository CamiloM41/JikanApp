import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css"

function Favoritos() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('anime');

  const tipos = [
    { valor: 'anime', nombre: 'Anime', clave: 'favoritos', ruta: 'anime' },
    { valor: 'manga', nombre: 'Manga', clave: 'favoritosManga', ruta: 'manga' },
    { valor: 'character', nombre: 'Personajes', clave: 'favoritosCharacter', ruta: 'character' },
    { valor: 'people', nombre: 'Personas', clave: 'favoritosPeople', ruta: 'people' }
  ];

  const tipoActual = tipos.find((t) => t.valor === tipo);

  const leerFavoritos = (clave) => {
    try {
      return JSON.parse(localStorage.getItem(clave) || '[]');
    } catch {
      return [];
    }
  };

  const favoritos = leerFavoritos(tipoActual.clave);

  return (
    <div className="pagina">
      <h1 className="titulo-pagina">Favoritos</h1>

      <div className="barra-filtros">
        <select
          value={tipo}
          aria-label="Tipo"
          onChange={(e) => setTipo(e.target.value)}
        >
          {tipos.map((t) => (
            <option key={t.valor} value={t.valor}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      {favoritos.length === 0 && (
        <p className="estado">
          Aún no tienes favoritos aquí. Toca el corazón en una ficha para guardarla.
        </p>
      )}

      <div className="rejilla">
        {favoritos.map((item) => (
          <div
            className="tarjeta"
            key ={item.id}
            onClick={() => navigate(`/${tipoActual.ruta}/${item.id}`)}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
            />
            <p className="tarjeta-titulo">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Favoritos;