import './style.css'

function Info(){
    return(
        <div className="info">
            <div className="info-portada">
                <h1 className="info-titulo">freaku</h1>
                <p className="info-autor">Fawnolive</p>
            </div>

            <div className="info-caja">
                <p>
                    Explora. Descubre. Colecciona.
                </p>
            </div>
            
            <section className="info-seccion info-marca">
                <h2>Un rinconcito para fans</h2>

                <p>
                    Freaku nació para quienes encuentran algo especial en cada
                    historia, se encariñan con personajes ficticios y siempre
                    tienen un anime más por descubrir.
                </p>

                <p>
                    Un lugar para guardar tus favoritos, encontrar nuevas
                    historias y disfrutar de ese pequeño universo que hace
                    que ser fan sea tan especial.
                </p>

                <p className="info-frase">
                    Hecho con cariño para corazones otaku.
                </p>
            </section>

            <section className="info-seccion">
                <h2>¿Qué puedes hacer?</h2>

                <ul>
                    <li>Explorar: buscar anime y manga por nombre y filtrar por género.</li>
                    <li>Top: ver el ranking de los mejores animes con su puntuación.</li>
                    <li>Colección: descubrir cartas misteriosas de anime, manga, personajes y personas.</li>
                    <li>Favoritos: guardar los títulos que más te gustan.</li>
                </ul>
            </section>

            <section className="info-seccion">
                <h2>¿De dónde vienen los datos?</h2>

                <p>
                    La información se obtiene de la API de Tenrai, que está
                    basada en los datos de MyAnimeList. Los títulos, imágenes,
                    sinopsis y puntuaciones pertenecen a sus respectivos autores.
                </p>
            </section>


            <p className="info-pie">
                <span>Freaku</span>
                <span>v 1.0.0</span>
            </p>
        </div>
    )
}

export default Info