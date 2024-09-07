import { useEffect, useState } from "react";
import { readFavoriteSongs } from "../../services/favoriteSongsAPI";
import { songsColletion } from "../../types";
import MusicCard from "../../components/MusicCard";
import Loading from "../../components/Loading";

function Favorites() {
  const [favSongs, setFavSongs] = useState<songsColletion[]>([]);
  const [isLoad, setIsLoad] = useState(false);

  const getFavSongs = async () => {
    setIsLoad(true);
    const songs = await readFavoriteSongs();
    setFavSongs(songs);
    setIsLoad(false);
  };

  useEffect(() => {
      getFavSongs();
    }, []);

  const handleFavoriteToggle = (trackId: number, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavSongs((prevFavSongs) =>
        prevFavSongs.filter((song) => song.trackId !== trackId)
      );
    }
  };

  if (isLoad) return <Loading />;

  return (
    <div>
      <h1>Sua musicas Favoritas</h1>
      <ul>
        {!isLoad &&
          favSongs.map(
            (
              { artistName, collectionName, previewUrl, trackId, trackName },
              i
            ) => (
              <MusicCard
                key={i}
                artistName={artistName}
                collectionName={collectionName}
                previewUrl={previewUrl}
                trackId={trackId}
                trackName={trackName}
                onFavoriteToggle={handleFavoriteToggle}
              />
            )
          )}
      </ul>
    </div>
  );
}

export default Favorites;
