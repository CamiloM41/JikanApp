import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'
import "./style.css"

function People(){
    const { name } = useParams(); 
    const [dataPeople, setDataPeople] = useState([]);

    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritosPeople') || '[]');
        } catch {
            return [];
        }
    });

    const esFavorito = favoritos.some(p => p.id === dataPeople.mal_id);

    useEffect(() => {
    fetch(`https://api.tenrai.org/v1/people/${name}`)
      .then(response => response.json())
      .then(responseData => setDataPeople(responseData.data))
      .catch(error => console.error("Error:", error));
    }, [name]); 
    console.log(dataPeople)

    if (!dataPeople || !dataPeople.mal_id) return <p className="estado">Cargando...</p>;

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
        nuevosFavoritos = favoritos.filter(p => p.id !== dataPeople.mal_id);
        } else {
        nuevosFavoritos = [...favoritos, { id: dataPeople.mal_id, title: dataPeople.name, image:dataPeople.images.jpg.image_url}];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritosPeople', JSON.stringify(nuevosFavoritos));
    };
    
    return(
        <div className="detalle">
            <p className="detalle-id">#{dataPeople.mal_id}</p>
            <h1 className="detalle-titulo">{dataPeople.name}</h1>

            <div className="detalle-cuerpo">
                <div className="detalle-cabecera">
                    <img 
                        src={dataPeople.images.jpg.image_url} 
                        alt={dataPeople.name}
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
                <p><span>Nombre</span>{dataPeople.given_name}</p>
                <p><span>Apellido</span>{dataPeople.family_name}</p>
                <p><span>Nombres alternativos</span>{dataPeople.alternate_names?.join(", ")}</p>
                <p><span>Cumpleaños</span>{dataPeople.birthday ? new Date(dataPeople.birthday).toLocaleDateString() : "Sin datos"}</p>
                <p><span>Favoritos</span>{dataPeople.favorites}</p>
                <p><span>Sitio web</span>{dataPeople.website_url ? (
                        <a
                            href={dataPeople.website_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {dataPeople.website_url}
                        </a>
                    ) : (
                        "Sin datos"
                    )}</p>
                </div>
            </div>

            <div className="detalle-sinopsis">
                <h2>Información</h2>
                <p>{dataPeople.about}</p>
            </div>
        </div>
    )
}
export default People;