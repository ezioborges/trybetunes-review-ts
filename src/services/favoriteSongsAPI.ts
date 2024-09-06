import { songsColletion } from "../types";

// Tipos e constantes
const FAVORITE_SONGS_KEY = 'favorite_songs';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY) as string)) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}

export const readFavoriteSongs = (): songsColletion[] => JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY) as string);

export const saveFavoriteSongs = (favoriteSongs: songsColletion[]): void => localStorage
  .setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));

const simulateRequest = <T>(response: T) => (callback: (response: T) => void): void => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteSongs = (): Promise<songsColletion[]> => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  simulateRequest(favoriteSongs)(resolve);
});

export const addSong = (song: songsColletion): Promise<string> => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs([...favoriteSongs, song]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeSong = (song: songsColletion): Promise<string> => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
