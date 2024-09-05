import { useLocation } from "react-router-dom";
import getMusics from "../../services/musicsAPI";
import { useEffect, useState } from "react";
import { songsColletion } from "../../types";
import MusicCard from "../../components/MusicCard";

function Album() {
  const location = useLocation();

  const [collection, setCollection] = useState<songsColletion[]>([]);
  const [loading, setLoading] = useState(false);

  const getColletionSongs = (location: string) => {
    const collectionId = location.slice(7);

    return +collectionId;
  };

  const getSongs = async () => {
    setLoading(true);
    const colletionId = getColletionSongs(location.pathname);
    const listMusics = await getMusics(colletionId);
    setCollection(listMusics.slice(1));
    setLoading(false);
  };

  useEffect(() => {
    const FetchSongs = async () => {
      await getSongs();
    };
    FetchSongs();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {!loading && (
        <div>
          <h1>Album Page</h1>
          <ul>
            {collection.map(
              ({ artistName, collectionName, previewUrl, trackName }, i) => (
                <MusicCard
                  key={i + 1}
                  artistName={artistName}
                  collectionName={collectionName}
                  previewUrl={previewUrl}
                  trackName={trackName}
                />
              )
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Album;
