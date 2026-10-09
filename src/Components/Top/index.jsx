import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


import './style.css'

function Top(){
    const navigate = useNavigate();
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState([]);
    const [TodoslosAnimes, setTodoslosAnimes] = useState([]);
    
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
        let url=`https://api.tenrai.org/v1/top/anime?page=${pagina}`;

    fetch(url)
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
        {TodoslosAnimes.map((anime) => (
            <div 
                key ={anime.mal_id}
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
            >
                <p >{anime.title}</p>
                <img src={anime.images.jpg.image_url}
                alt={`Anime ${anime.title}`} width='auto' height='60' loading='lazy'
                />
                <p>{anime.score}</p>
            </div>
            
        ))}

            <div>
                <button onClick={paginaAnterior} disabled={pagina === 1} > 
                    Anterior 
                </button> 
                <span> Página {pagina}</span> 
                <button onClick={paginaSiguiente} disabled={pagina === totalPaginas} > 
                    Siguiente 
                </button>
            </div>
        </>
    )
    
}
export default Top