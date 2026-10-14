import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


import './style.css'

function Top(){
    const navigate = useNavigate();
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [tipo, setTipo] = useState('anime');

    const tipos = [
        { valor: 'anime', nombre: 'Anime', endpoint: 'anime', ruta: 'anime' },
        { valor: 'manga', nombre: 'Manga', endpoint: 'manga', ruta: 'manga' },
        { valor: 'character', nombre: 'Personajes', endpoint: 'characters', ruta: 'character' },
        { valor: 'people', nombre: 'Personas', endpoint: 'people', ruta: 'people' }
    ];

    const tipoActual = tipos.find((t) => t.valor === tipo);

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
        let url=`https://api.tenrai.org/v1/top/${tipoActual.endpoint}?page=${pagina}`;

        setCargando(true);

        fetch(url)
          .then(response => response.json())
          .then(responseData => {
            setResultados(responseData.data || []);
            setTotalPaginas(responseData.pagination?.last_visible_page || 1);
            setCargando(false);
          })
          .catch(error => {
            console.error("Error:", error);
            setCargando(false);
          });
    }, [pagina, tipo]); 

    return(
        <div className="pagina">
            <h1 className="titulo-pagina">Top</h1>

            <div className="barra-filtros">
                <select
                    value={tipo}
                    aria-label="Tipo"
                    onChange={(e) => {
                        setTipo(e.target.value);
                        setPagina(1);
                    }}
                >
                    {tipos.map((t) => (
                        <option key={t.valor} value={t.valor}>
                            {t.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {cargando && <p className="estado">Cargando...</p>}

            {!cargando && resultados.length === 0 && <p className="estado">Sin resultados</p>}

            <div className="rejilla">
                {resultados.map((item, indice) => {
                    const titulo = item.title || item.name;

                    return (
                        <div 
                            className="tarjeta"
                            key ={item.mal_id}
                            onClick={() => navigate(`/${tipoActual.ruta}/${item.mal_id}`)}
                        >
                            <span className="tarjeta-rango">
                                {item.rank ?? (pagina - 1) * 25 + indice + 1}
                            </span>
                            <img src={item.images.jpg.image_url}
                            alt={`${tipoActual.nombre} ${titulo}`} loading='lazy'
                            />
                            <p className="tarjeta-titulo">{titulo}</p>
                            {item.score !== undefined
                                ? <p className="tarjeta-dato">Puntuación {item.score}</p>
                                : <p className="tarjeta-dato">Favoritos {item.favorites}</p>
                            }
                        </div>
                    );
                })}
            </div>

            <div className="paginacion">
                <button onClick={paginaAnterior} disabled={pagina === 1} > 
                    Anterior 
                </button> 
                <span>Página {pagina}</span> 
                <button onClick={paginaSiguiente} disabled={pagina === totalPaginas} > 
                    Siguiente 
                </button>
            </div>
        </div>
    )
    
}
export default Top