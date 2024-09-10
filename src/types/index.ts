export type LoginType = {
  errorMsg: string[];
  isValidLogin: (name: string) => boolean;
};

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
  artworkUrl100?: string;
  onFavoriteToggle?: (trackId: number, isFavorite: boolean) => void;
};

export type User = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type NavLinkComponentType = {
  link: string;
  dataTest: string;
};
