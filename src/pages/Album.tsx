import { useLocation } from "react-router-dom";
import getMusics from "../services/musicsAPI";
import { useEffect, useState } from "react";
import { songsColletion } from "../types";
import MusicCard from "../components/MusicCard";
import Loading from "../components/Loading";

import '../styles/music-card-hover.css';

function Album() {
  const location = useLocation();

  const [collection, setCollection] = useState<songsColletion[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const getColletionId = (location: string) => {
    const collectionId = location.slice(7);

    return +collectionId;
  };

  const getSongs = async () => {
    setLoading(true);
    const colletionId = getColletionId(location.pathname);
    const listMusics = await getMusics(colletionId);

    setCollection(listMusics.slice(1));
    // ver se o tamanho do listMusics é maior que zero,
    // caso sim ele pego o nome do artista na primeira posição do array
    if (listMusics.length > 0) {
      setName(listMusics[0].artistName);
    }

    setLoading(false);
  };

  useEffect(() => {
    const FetchSongs = async () => {
      await getSongs();
    };
    FetchSongs();
  }, []);

  if (loading) return <Loading />;
  const foto = collection.find((pic) => pic);

  return (
    <>
      {!loading && (
        <>
          <div className="d-flex justify-content-center p-3">
            <h1>Musicas de {name}</h1>
          </div>
          <div
            
            className="row d-flex"
          >
            <div
              className="col-4 d-flex justify-content-center align-items-start p-4"
            >
              <img
                src={foto?.artworkUrl100}
                alt={`capa do album ${foto?.artistName}`}
                className="img-fluid"
                style={{ width: '50%', height: 'auto' }}
              />
            </div>
            <div
              className="col d-flex flex-row overflow-auto list-musics mx-5"
            >
              <ul>
                {collection.map(
                  (
                    {
                      artistName,
                      collectionName,
                      previewUrl,
                      trackName,
                      trackId,
                    },
                    i
                  ) => (
                    <MusicCard
                      key={i + 1}
                      artistName={artistName}
                      collectionName={collectionName}
                      previewUrl={previewUrl}
                      trackName={trackName}
                      trackId={trackId}
                    />
                  )
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Album;
