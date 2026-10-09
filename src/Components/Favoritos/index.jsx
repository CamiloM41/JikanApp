import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css"

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });

  return (
    <>
      <div className="c-lista">
        {favoritos.map((anime) => (
          <div
            key ={anime.id}
            onClick={() => navigate(`/anime/${anime.id}`)}
          >
            <p>{anime.title}</p>
            <img
              src={anime.image}
              alt={anime.title}
              width="auto"
              height="60"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  )
}
export default Favoritos;