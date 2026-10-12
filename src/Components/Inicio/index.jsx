import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import './style.css'

function Inicio(){
    const navigate = useNavigate();
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState([]);
    const [TodoslosAnimes, setTodoslosAnimes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [genero, setGenero] = useState('');

    const generos = [
        { mal_id: 1, name: 'Action' },
        { mal_id: 2, name: 'Adventure' },
        { mal_id: 4, name: 'Comedy' },
        { mal_id: 8, name: 'Drama' },
        { mal_id: 10, name: 'Fantasy' },
        { mal_id: 14, name: 'Horror' },
        { mal_id: 7, name: 'Mystery' },
        { mal_id: 22, name: 'Romance' },
        { mal_id: 24, name: 'Sci-Fi' },
        { mal_id: 36, name: 'Slice of Life' },
        { mal_id: 30, name: 'Sports' },
        { mal_id: 37, name: 'Supernatural' },
        { mal_id: 41, name: 'Suspense' }
    ];

    const paginaSiguiente=()=>{
        if (pagina < totalPaginas){
            setPagina(pagina+1)
        }
    }

    const paginaAnterior = () =>{
        if (pagina>1){
            setPagina(pagina-1)
        }
    }

    useEffect(() => {
        let url=`https://api.tenrai.org/v1/anime?page=${pagina}`;

        if (busqueda.length >= 2 && isNaN(busqueda)) {
            url += `&q=${encodeURIComponent(busqueda)}`;
        }

        if (genero !== '') {
            url += `&genres=${genero}`;
        }

        fetch(url)
          .then(response => response.json())
          .then(responseData => {
            setTodoslosAnimes(responseData.data);
            setTotalPaginas(responseData.pagination.last_visible_page);
          })
          .catch(error => console.error("Error:", error));
    }, [pagina, busqueda, genero]);

    console.log(TodoslosAnimes)

    if (TodoslosAnimes.length===0){
        return <p>Cargando...</p>
    }

    return(
        <>
            <input
                type="text"
                placeholder="Buscar anime"
                value={busqueda}
                onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPagina(1);
                }}
            />

            <select
                value={genero}
                onChange={(e) => {
                    setGenero(e.target.value);
                    setPagina(1);
                }}
            >
                <option value="">Todos los géneros</option>

                {generos.map((g) => (
                    <option key={g.mal_id} value={g.mal_id}>
                        {g.name}
                    </option>
                ))}
            </select>

            {TodoslosAnimes.map((anime) => (
                <div
                    key={anime.mal_id}
                    onClick={() => navigate(`/anime/${anime.mal_id}`)}
                >
                    <p>{anime.title}</p>
                    <img
                        src={anime.images.jpg.image_url}
                        alt={`Anime ${anime.title}`}
                        width='auto'
                        height='60'
                        loading='lazy'
                    />
                </div>
            ))}

            <div>
                <button onClick={paginaAnterior} disabled={pagina === 1}>
                    Anterior
                </button>

                <span> Página {pagina}</span>

                <button onClick={paginaSiguiente} disabled={pagina === totalPaginas}>
                    Siguiente
                </button>
            </div>
        </>
    )
}

export default Inicio