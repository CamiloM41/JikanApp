import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'
import "./style.css"

function Character(){
    const { name } = useParams(); 
    const [dataCharacter, setDataCharacter] = useState([]);

    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritosCharacter') || '[]');
        } catch {
            return [];
        }
    });

    const esFavorito = favoritos.some(p => p.id === dataCharacter.mal_id);

    useEffect(() => {
    fetch(`https://api.tenrai.org/v1/characters/${name}`)
      .then(response => response.json())
      .then(responseData => setDataCharacter(responseData.data))
      .catch(error => console.error("Error:", error));
    }, [name]); 
    console.log(dataCharacter)

    if (!dataCharacter || !dataCharacter.mal_id) return <p className="estado">Cargando...</p>;

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
        nuevosFavoritos = favoritos.filter(p => p.id !== dataCharacter.mal_id);
        } else {
        nuevosFavoritos = [...favoritos, { id: dataCharacter.mal_id, title: dataCharacter.name, image:dataCharacter.images.jpg.image_url}];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritosCharacter', JSON.stringify(nuevosFavoritos));
    };
    
    return(
        <div className="detalle">
            <p className="detalle-id">#{dataCharacter.mal_id}</p>
            <h1 className="detalle-titulo">{dataCharacter.name}</h1>

            <div className="detalle-cuerpo">
                <div className="detalle-cabecera">
                    <img 
                        src={dataCharacter.images.jpg.image_url} 
                        alt={dataCharacter.name}
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
                <p><span>Nombre en kanji</span>{dataCharacter.name_kanji}</p>
                <p><span>Apodos</span>{dataCharacter.nicknames?.join(", ")}</p>
                <p><span>Favoritos</span>{dataCharacter.favorites}</p>
                </div>
            </div>

            <div className="detalle-sinopsis">
                <h2>Información</h2>
                <p>{dataCharacter.about}</p>
            </div>
        </div>
    )
}
export default Character;