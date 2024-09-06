import { useEffect, useState } from "react";
import { songsColletion } from "../../types";
import {
  addSong,
  readFavoriteSongs,
  saveFavoriteSongs,
} from "../../services/favoriteSongsAPI";

function MusicCard({
  artistName,
  collectionName,
  trackName,
  previewUrl,
  trackId,
}: songsColletion) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      const favSongs = await readFavoriteSongs();
      const isSongFavorite = favSongs.some((song) => song.trackId === trackId);
      setIsFavorite(isSongFavorite);
    };
    loadFavorites();
  }, [trackId]);

  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLoad(true);
    setIsFavorite((prev) => !prev);
    const check = target.checked;
    const trackId = +target.value;

    if (check) {
      const newSong: songsColletion = {
        artistName,
        collectionName,
        previewUrl,
        trackId,
        trackName
      }

      await addSong(newSong);
      setIsFavorite(true);
    } else {
      const favSongs = await readFavoriteSongs();
      const newList = favSongs.filter((song) => song.trackId !== trackId)
      await saveFavoriteSongs(newList)

      window.location.reload();
      setIsFavorite(false)
    }

    setLoad(false);
  };

  return (
    <>
      <div style={{ border: "1px solid black" }}>
        <p>{artistName}</p>
        <p>{collectionName}</p>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={previewUrl} controls>
          <track kind="captions" />O seu navegador não suporta o elemento{" "}
          <code>audio</code>.
        </audio>
        <label htmlFor="favoriteSong">
          {load ? (
            "Loading ..."
          ) : (
            <input
              type="checkbox"
              name="favoriteSong"
              value={trackId}
              checked={isFavorite}
              onChange={handleChange}
            />
          )}
        </label>
      </div>
    </>
  );
}

export default MusicCard;
