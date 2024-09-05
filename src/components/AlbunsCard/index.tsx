import { AlbumType } from "../../types";

function AlbunsCard({
  artistId,
  artistName,
  collectionId,
  collectionName,
  collectionPrice,
  artworkUrl100,
  releaseDate,
  trackCount,
}: AlbumType) {
  return (
    <div style={{ border: "1px solid red" }}>
      <p>{artistId}</p>
      <p>{artistName}</p>
      <p>{collectionId}</p>
      <p>{collectionName}</p>
      <p>{collectionPrice}</p>
      <img src={artworkUrl100} alt={`capa do album ${collectionName}`} />
      <p>{releaseDate}</p>
      <p>{trackCount}</p>
    </div>
  );
}

export default AlbunsCard;
