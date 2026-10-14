import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import './style.css'

function Inicio(){
    const navigate = useNavigate();
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [genero, setGenero] = useState('');
    const [tipo, setTipo] = useState('anime');

    const tipos = [
        { valor: 'anime', nombre: 'Anime', endpoint: 'anime', ruta: 'anime' },
        { valor: 'manga', nombre: 'Manga', endpoint: 'manga', ruta: 'manga' },
        { valor: 'character', nombre: 'Personajes', endpoint: 'characters', ruta: 'character' },
        { valor: 'people', nombre: 'Personas', endpoint: 'people', ruta: 'people' }
    ];

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

    const tipoActual = tipos.find((t) => t.valor === tipo);
    const tieneGeneros = tipo === 'anime' || tipo === 'manga';

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
        let url=`https://api.tenrai.org/v1/${tipoActual.endpoint}?page=${pagina}`;

        if (busqueda.length >= 2 && isNaN(busqueda)) {
            url += `&q=${encodeURIComponent(busqueda)}`;
        }

        if (tieneGeneros && genero !== '') {
            url += `&genres=${genero}`;
        }

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
    }, [pagina, busqueda, genero, tipo]);

    return(
        <div className="pagina">
            <h1 className="titulo-pagina">Explorar</h1>

            <div className="barra-filtros">
                <select
                    value={tipo}
                    aria-label="Tipo"
                    onChange={(e) => {
                        setTipo(e.target.value);
                        setGenero('');
                        setPagina(1);
                    }}
                >
                    {tipos.map((t) => (
                        <option key={t.valor} value={t.valor}>
                            {t.nombre}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder={`Buscar ${tipoActual.nombre.toLowerCase()}`}
                    aria-label="Buscar"
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPagina(1);
                    }}
                />

                {tieneGeneros && (
                    <select
                        value={genero}
                        aria-label="Género"
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
                )}
            </div>

            {cargando && <p className="estado">Cargando...</p>}

            {!cargando && resultados.length === 0 && (
                <p className="estado">Sin resultados. Prueba con otro nombre o género.</p>
            )}

            <div className="rejilla">
                {resultados.map((item) => {
                    const titulo = item.title || item.name;

                    return (
                        <div
                            className="tarjeta"
                            key={item.mal_id}
                            onClick={() => navigate(`/${tipoActual.ruta}/${item.mal_id}`)}
                        >
                            <img
                                src={item.images.jpg.image_url}
                                alt={`${tipoActual.nombre} ${titulo}`}
                                loading='lazy'
                            />
                            <p className="tarjeta-titulo">{titulo}</p>
                        </div>
                    );
                })}
            </div>

            <div className="paginacion">
                <button onClick={paginaAnterior} disabled={pagina === 1}>
                    Anterior
                </button>

                <span>Página {pagina}</span>

                <button onClick={paginaSiguiente} disabled={pagina === totalPaginas}>
                    Siguiente
                </button>
            </div>
        </div>
    )
}

export default Inicio