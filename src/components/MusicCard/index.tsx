import { useEffect, useState } from "react";
import { Song, songsColletion } from "../../types";
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
  const [favoriteList, setFavoriteList] = useState<Song[]>([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      const favSongs = await readFavoriteSongs();
      const isSongFavorite = favSongs.some((song) => song.trackId === trackId);
      setIsFavorite(isSongFavorite);
    }
    loadFavorites()
  }, [trackId])

  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLoad(true);
    setIsFavorite((fav) => !fav);

    const check = target.checked;

    if (check) {
      const newSong = {
        trackId,
        trackName,
        artistName,
      };

      await addSong(newSong);
      setFavoriteList((prevLis) => [...prevLis, newSong]);
      setIsFavorite(true);
    } else {
      const favSongs = await readFavoriteSongs();
      const newList = favSongs.filter((song) => song.trackId !== trackId);
      console.log("🚀 ~ newList:", newList)
      setFavoriteList(newList);
      await saveFavoriteSongs(newList);

      setIsFavorite(false);
    }
    setLoad(false)
  };
  return (
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
            checked={isFavorite}
            onChange={handleChange}
          />
        )}
      </label>
    </div>
  );
}

export default MusicCard;
