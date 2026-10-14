import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'
import "./style.css"

function Anime(){
    const { name } = useParams(); 
    const [dataAnime, setDataAnime] = useState([]);

    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritos') || '[]');
        } catch {
            return [];
        }
    });

    const esFavorito = favoritos.some(p => p.id === dataAnime.mal_id);

    useEffect(() => {
    fetch(`https://api.tenrai.org/v1/anime/${name}`)
      .then(response => response.json())
      .then(responseData => setDataAnime(responseData.data))
      .catch(error => console.error("Error:", error));
    }, [name]); 
    console.log(dataAnime)

    if (!dataAnime || !dataAnime.mal_id) return <p className="estado">Cargando...</p>;

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
        nuevosFavoritos = favoritos.filter(p => p.id !== dataAnime.mal_id);
        } else {
        nuevosFavoritos = [...favoritos, { id: dataAnime.mal_id, title: dataAnime.title, image:dataAnime.images.jpg.image_url}];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };
    
    return(
        <div className="detalle">
            <p className="detalle-id">#{dataAnime.mal_id}</p>
            <h1 className="detalle-titulo">{dataAnime.title}</h1>

            <div className="detalle-cuerpo">
                <div className="detalle-cabecera">
                    <img 
                        src={dataAnime.images.jpg.image_url} 
                        alt={dataAnime.title}
                    />

                    <button
                        className="boton-favorito"
                        onClick={toggleFavorito}
                        aria-label={esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                    >
                        {esFavorito ? '❤️' : '🤍'}
                    </button>
                </div>

                <div className="detalle-datos">
                <p><span>Tipo</span>{dataAnime.type}</p>
                <p><span>Fuente</span>{dataAnime.source}</p>
                <p><span>Episodios</span>{dataAnime.episodes}</p>
                <p><span>Duración</span>{dataAnime.duration}</p>
                <p><span>Estado</span>{dataAnime.status}</p>
                <p><span>Rating</span>{dataAnime.rating}</p>
                <p><span>Puntuación</span>{dataAnime.score}</p>
                <p><span>Ranking</span>{dataAnime.rank}</p>
                <p><span>Año</span>{dataAnime.year}</p>
                <p><span>Temporada</span>{dataAnime.season}</p>
                <p><span>Géneros</span>{dataAnime.genres.map(genre => genre.name).join(", ")}</p>
                <p><span>Estudios</span>{dataAnime.studios.map(studio => studio.name).join(", ")}</p>
                </div>
            </div>

            <div className="detalle-sinopsis">
                <h2>Sinopsis</h2>
                <p>{dataAnime.synopsis}</p>
            </div>
        </div>
    )
}
export default Anime;