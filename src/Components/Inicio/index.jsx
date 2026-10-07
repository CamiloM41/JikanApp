import { useState, useEffect } from 'react';
import { data, useNavigate } from "react-router-dom";

import './style.css'

function Inicio(){
    const navigate = useNavigate();
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState([]);
    const [TodoslosAnimes, setTodoslosAnimes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    
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

    let resultados =TodoslosAnimes;

    if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = TodoslosAnimes.filter(anime =>
      anime.title.toLowerCase().includes(busqueda.toLowerCase())
    );
    }
    useEffect(() => {
    fetch(`https://api.tenrai.org/v1/anime?page=${pagina}`)
      .then(response => response.json())
      .then(responseData => {
        setTodoslosAnimes(responseData.data);
        setTotalPaginas(responseData.pagination.last_visible_page );
      })
      .catch(error => console.error("Error:", error));
    }, [pagina]); 
    console.log(TodoslosAnimes)

    if (TodoslosAnimes.length===0){
        return <p>Cargando...</p>
    }
    return(
        <>
            inicio
            <input
            type="text"
            placeholder="Buscar anime"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            />
        {resultados.map((anime) => (
            <div 
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
            >
                <p key ={anime.mal_id}>
                    {anime.title}</p>
                <img src={anime.images.jpg.image_url}
                alt={`Anime ${anime.title}`} width='auto' height='60' loading='lazy'
                />
            </div>
            
        ))}

            <div>
                <button onClick={paginaAnterior} disabled={pagina === 1} > 
                    Anterior 
                </button> 
                <span> Página {pagina} de {totalPaginas} </span> 
                <button onClick={paginaSiguiente} disabled={pagina === totalPaginas} > 
                    Siguiente 
                </button>
            </div>
        </>
    )
    
}
export default Inicio