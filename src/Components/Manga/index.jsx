import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import "./style.css"

function Manga(){
    const { name } = useParams();
    const [dataManga, setDataManga] = useState([]);

    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritosManga') || '[]');
        } catch {
            return [];
        }
    });

    const esFavorito = favoritos.some(p => p.id === dataManga.mal_id);

    useEffect(() => {
    fetch(`https://api.tenrai.org/v1/manga/${name}`)
      .then(response => response.json())
      .then(responseData => setDataManga(responseData.data))
      .catch(error => console.error("Error:", error));
    }, [name]);
    console.log(dataManga)

    if (!dataManga || !dataManga.mal_id) return <p className="estado">Cargando...</p>;

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
        nuevosFavoritos = favoritos.filter(p => p.id !== dataManga.mal_id);
        } else {
        nuevosFavoritos = [...favoritos, { id: dataManga.mal_id, title: dataManga.title, image:dataManga.images.jpg.image_url}];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritosManga', JSON.stringify(nuevosFavoritos));
    };

    return(
        <div className="detalle">
            <p className="detalle-id">#{dataManga.mal_id}</p>
            <h1 className="detalle-titulo">{dataManga.title}</h1>

            <div className="detalle-cuerpo">
                <div className="detalle-cabecera">
                    <img 
                        src={dataManga.images.jpg.image_url} 
                        alt={dataManga.title}
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
                <p><span>Tipo</span>{dataManga.type}</p>
                <p><span>Capítulos</span>{dataManga.chapters}</p>
                <p><span>Volúmenes</span>{dataManga.volumes}</p>
                <p><span>Estado</span>{dataManga.status}</p>
                <p><span>Publicado</span>{dataManga.published?.string}</p>
                <p><span>Puntuación</span>{dataManga.score}</p>
                <p><span>Ranking</span>{dataManga.rank}</p>
                <p><span>Popularidad</span>{dataManga.popularity}</p>
                <p><span>Géneros</span>{dataManga.genres.map(genre => genre.name).join(", ")}</p>
                <p><span>Autores</span>{dataManga.authors.map(author => author.name).join(", ")}</p>
                <p><span>Revistas</span>{dataManga.serializations.map(revista => revista.name).join(", ")}</p>
                </div>
            </div>

            <div className="detalle-sinopsis">
                <h2>Sinopsis</h2>
                <p>{dataManga.synopsis}</p>
            </div>
        </div>
    )
}
export default Manga;