export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type songsColletion = {
  artistName: string;
  collectionName: string;
  trackName: string;
  previewUrl: string;
  trackId: number;
  onFavoriteToggle?: (trackId: number, isFavorite: boolean) => void;
};

export type User = {
  name: string;
  email: string;
  image: string;
  description: string;
};
