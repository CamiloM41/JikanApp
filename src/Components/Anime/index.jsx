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

    if (!dataAnime || !dataAnime.mal_id) return <p>Cargando...</p>;

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
        <div>
        <p>{dataAnime.mal_id}</p>
        <h1>{dataAnime.title}</h1>

        <img 
            src={dataAnime.images.jpg.image_url} 
            alt={dataAnime.title}
            width="200"
        />

        <button onClick={toggleFavorito}>
            {esFavorito ? '❤️' : '🤍'}
          </button>

        <p>Tipo: {dataAnime.type}</p> 
        <p>Fuente: {dataAnime.source}</p> 
        <p>Episodios: {dataAnime.episodes}</p> 
        <p>Duración: {dataAnime.duration}</p> 
        <p>Estado: {dataAnime.status}</p> 
        <p>Rating: {dataAnime.rating}</p> 
        <p>Puntuación: {dataAnime.score}</p> 
        <p>Ranking: {dataAnime.rank}</p> 
        <p>Año: {dataAnime.year}</p> 
        <p>Temporada: {dataAnime.season}</p>
        <p> Géneros:{" "} 
            {dataAnime.genres.map(genre => genre.name).join(", ")} </p> 
        <p> Estudios:{" "} 
            {dataAnime.studios.map(studio => studio.name).join(", ")} </p> 
        <p>Sinopsis:</p> 
        <p>{dataAnime.synopsis}</p>

        </div>
    )
}
export default Anime;