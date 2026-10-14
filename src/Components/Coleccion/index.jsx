import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Tarot() {
    const [cartas, setCartas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tarotCartas') || '[]');
    } catch {
      return [];
    }
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

    // Guardar las cartas para que sigan ahí al volver a la pestaña.
  useEffect(() => {
    try {
      localStorage.setItem('tarotCartas', JSON.stringify(cartas));
    } catch {
      // Si el almacenamiento falla, se ignora.
    }
  }, [cartas]);

  const apis = [
    {
      url: 'https://api.tenrai.org/v1/random/anime',
      tipo: 'Anime',
      ruta: 'anime',
    },
    {
      url: 'https://api.tenrai.org/v1/random/manga',
      tipo: 'Manga',
      ruta: 'manga',
    },
    {
      url: 'https://api.tenrai.org/v1/random/characters',
      tipo: 'Personaje',
      ruta: 'character',
    },
    {
      url: 'https://api.tenrai.org/v1/random/people',
      tipo: 'Persona',
      ruta: 'people',
    },
  ];

  const sacarCartas = async () => {
    setCargando(true);
    setError('');
    setCartas([]);

    try {
      // Consultar las cuatro APIs al mismo tiempo.
      const resultados = await Promise.all(
        apis.map(async (api, indice) => {
          const respuesta = await fetch(api.url);

          if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
          }

          const respuestaApi = await respuesta.json();
          const datos = respuestaApi.data ?? respuestaApi;

          const nombre =
            datos.name ??
            datos.title ??
            datos.fullName ??
            datos.full_name ??
            datos.nombre ??
            `${api.tipo} misterioso`;

          const imagen =
            datos.images?.jpg?.image_url ??
            datos.images?.webp?.image_url ??
            datos.image_url ??
            datos.image ??
            datos.images?.jpg?.large_image_url ??
            datos.images?.webp?.large_image_url ??
            '';

          const descripcion =
            datos.synopsis ??
            datos.about ??
            datos.description ??
            datos.bio ??
            datos.meaning ??
            'Su historia sigue siendo un misterio';

          return {
            id: `${api.tipo}-${indice}`,
            tipo: api.tipo,
            nombre:
              typeof nombre === 'string' ? nombre : api.tipo,
            imagen: typeof imagen === 'string' ? imagen : '',
            significado:
              typeof descripcion === 'string'
                ? descripcion
                : 'Una nueva energía llega a tu vida.',
            enlace: datos.mal_id ? `/${api.ruta}/${datos.mal_id}` : '',
            volteada: false,
          };
        })
      );

      setCartas(resultados);
    } catch (err) {
      console.error('Error al consultar Tenrai API:', err);
      setError('No se pudieron repartir las cartas. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  // Voltear una carta sin afectar las demás.
  const voltearCarta = (id) => {
    setCartas((anteriores) =>
      anteriores.map((carta) =>
        carta.id === id
          ? { ...carta, volteada: !carta.volteada }
          : carta
      )
    );
  };

  return (
    <main className="tarot">
      <h1 className="tarot-titulo">Personajes Misteriosos</h1>

      <p className="tarot-descripcion">
        Cuatro cartas ocultas esperan por ti. Descubre
        qué anime, manga, personaje y persona se esconden detrás.
      </p>

      <button
        className="tarot-boton"
        onClick={sacarCartas}
        disabled={cargando}
      >
        {cargando
          ? 'Repartiendo cartas...'
          : cartas.length
            ? 'Repartir de nuevo'
            : 'Repartir las cartas'}
      </button>

      {error && <p className="tarot-error">{error}</p>}

      {cartas.length > 0 && (
        <p className="tarot-instruccion">
          {cartas.every((carta) => carta.volteada)
            ? 'Las cuatro cartas han sido reveladas.'
            : 'Haz clic en cada carta para descubrir quién es.'}
        </p>
      )}

      <section className="tarot-cartas">
        {cartas.map((carta, indice) => (
          <article
            className="tarot-carta"
            key={carta.id}
            style={{ '--retraso': `${indice * 0.25}s` }}
          >
            <span className="tarot-numero">
              {carta.tipo}
            </span>

            <button
              type="button"
              className={`tarot-volteador ${
                carta.volteada ? 'volteada' : ''
              }`}
              onClick={() => voltearCarta(carta.id)}
              aria-label={
                carta.volteada
                  ? `Volver a ocultar ${carta.nombre}`
                  : `Revelar carta de ${carta.tipo}`
              }
              aria-pressed={carta.volteada}
            >
              <span className="tarot-cara tarot-reverso">
                <span className="tarot-reverso-borde">
                  <span className="tarot-reverso-simbolo">☾</span>
                  <span className="tarot-reverso-simbolo">☼</span>
                </span>
              </span>

              <span className="tarot-cara tarot-frente">
                <span className="tarot-marco">
                  {carta.imagen ? (
                    <img
                      src={carta.imagen}
                      alt={carta.nombre}
                      loading="lazy"
                    />
                  ) : null}
                </span>

                <span className="tarot-nombre">
                  {carta.nombre}
                </span>

                <span className="tarot-significado">
                  {carta.significado}
                </span>

                {carta.enlace && (
                  <span
                    className="tarot-enlace"
                    onClick={(evento) => evento.stopPropagation()}
                  >
                    <Link
                      to={carta.enlace}
                      onClick={(evento) => evento.stopPropagation()}
                    >
                      Descubrir más
                    </Link>
                  </span>
                )}
              </span>
            </button>

            <p className="tarot-ayuda">
              {carta.volteada ? 'Revelada' : 'Toca para revelar'}
            </p>
          </article>
        ))}
      </section>

      {cartas.length === 4 && (
        <button
          className="tarot-repetir"
          onClick={sacarCartas}
          disabled={cargando}
        >
          Consultar de nuevo
        </button>
      )}

      <p className="tarot-pie">
        Descubre quién se esconde detrás de cada carta
      </p>
    </main>
  );
}

export default Tarot;