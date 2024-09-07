import { useEffect, useState } from "react";
import { songsColletion } from "../../types";
import {
  addSong,
  readFavoriteSongs,
  saveFavoriteSongs,
} from "../../services/favoriteSongsAPI";

import "./music-card.css";

function MusicCard({
  artistName,
  collectionName,
  trackName,
  previewUrl,
  trackId,
  onFavoriteToggle
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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoad(true);
    setIsFavorite((prev) => !prev);
    const check = e.target.checked;
    const trackId = +e.target.value;

    if (check) {
      const newSong: songsColletion = {
        artistName,
        collectionName,
        previewUrl,
        trackId,
        trackName,
      };

      await addSong(newSong);
      setIsFavorite(true);
      if (onFavoriteToggle) {
        onFavoriteToggle(trackId, true)
      }
    } else {
      e.preventDefault();
      const favSongs = await readFavoriteSongs();
      const newList = favSongs.filter((song) => song.trackId !== trackId);
      await saveFavoriteSongs(newList);

      setIsFavorite(false);
      if (onFavoriteToggle) {
        onFavoriteToggle(trackId, false)
      }
    }

    setLoad(false);
  };

  return (
    <>
      <div className="music-card-content">
        <p>{artistName}</p>
        <p>{collectionName}</p>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={previewUrl} controls>
          <track kind="captions" />O seu navegador não suporta o elemento{" "}
          <code>audio</code>.
        </audio>
        <label htmlFor="favoriteSong">
          {load ? (
            <img
              className="size-load"
              src="../../small-load-40.svg"
              alt="loading..."
            />
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
