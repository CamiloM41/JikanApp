import { useState } from 'react';
import './style.css';

function Tarot() {
  const [cartas, setCartas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const apis = [
    {
      url: 'https://api.tenrai.org/v1/random/anime',
      tipo: 'Anime',
      posicion: 'Pasado',
    },
    {
      url: 'https://api.tenrai.org/v1/random/manga',
      tipo: 'Manga',
      posicion: 'Presente',
    },
    {
      url: 'https://api.tenrai.org/v1/random/characters',
      tipo: 'Personaje',
      posicion: 'Futuro',
    },
    {
      url: 'https://api.tenrai.org/v1/random/people',
      tipo: 'Persona',
      posicion: 'Destino',
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
            'El destino guarda un mensaje que todavía debes descubrir.';

          return {
            id: `${api.tipo}-${indice}`,
            tipo: api.tipo,
            posicion: api.posicion,
            nombre:
              typeof nombre === 'string' ? nombre : api.tipo,
            imagen: typeof imagen === 'string' ? imagen : '',
            significado:
              typeof descripcion === 'string'
                ? descripcion
                : 'Una nueva energía llega a tu vida.',
            enlace: datos.url ?? datos.link ?? '',
            volteada: false,
          };
        })
      );

      // Barajar las cartas antes de repartirlas.
      const barajadas = [...resultados];

      for (let i = barajadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [barajadas[i], barajadas[j]] = [
          barajadas[j],
          barajadas[i],
        ];
      }

      setCartas(barajadas);
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
      <div className="tarot-estrellas">✦ · ☾ · ✧</div>

      <h1 className="tarot-titulo">El Tarot del Destino</h1>

      <p className="tarot-descripcion">
        Concéntrate en tu pregunta, deja que el destino
        baraje las cartas y descubre lo que te espera.
      </p>

      <button
        className="tarot-boton"
        onClick={sacarCartas}
        disabled={cargando}
      >
        {cargando
          ? '✧ Barajando el destino...'
          : cartas.length
            ? '✧ Barajar y repartir de nuevo ✧'
            : '✧ Barajar y repartir las cartas ✧'}
      </button>

      {error && <p className="tarot-error">{error}</p>}

      {cartas.length > 0 && (
        <p className="tarot-instruccion">
          {cartas.every((carta) => carta.volteada)
            ? 'Las cuatro cartas han revelado su destino.'
            : 'Haz clic en cada carta para revelar su mensaje.'}
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
              {carta.posicion}
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
                  : `Revelar carta de ${carta.posicion}`
              }
              aria-pressed={carta.volteada}
            >
              <span className="tarot-cara tarot-reverso">
                <span className="tarot-reverso-borde">
                  <span className="tarot-reverso-simbolo">☾</span>
                  <span className="tarot-reverso-estrellas">
                    ✦　✧　✦
                  </span>
                  <span className="tarot-reverso-centro">✧</span>
                  <span className="tarot-reverso-estrellas">
                    ✧　✦　✧
                  </span>
                  <span className="tarot-reverso-simbolo">☼</span>
                </span>
              </span>

              <span className="tarot-cara tarot-frente">
                <span className="tarot-tipo">{carta.tipo}</span>

                <span className="tarot-marco">
                  {carta.imagen ? (
                    <img
                      src={carta.imagen}
                      alt={carta.nombre}
                      loading="lazy"
                    />
                  ) : (
                    <span className="tarot-simbolo">✧</span>
                  )}
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
                    <a
                      href={carta.enlace}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(evento) => evento.stopPropagation()}
                    >
                      Descubrir más ↗
                    </a>
                  </span>
                )}
              </span>
            </button>

            <p className="tarot-ayuda">
              {carta.volteada ? '✦ Revelada ✦' : 'Toca para revelar'}
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
        ✦ El destino se revela a quienes se atreven a mirar ✦
      </p>
    </main>
  );
}

export default Tarot;