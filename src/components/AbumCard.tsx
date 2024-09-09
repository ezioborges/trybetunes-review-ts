import { AlbumType } from "../types";

function AlbunsCard({
  artistName,
  collectionName,
  collectionPrice,
  artworkUrl100,
  releaseDate,
  trackCount,
}: AlbumType) {
  const date = new Date(releaseDate);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img
        src={artworkUrl100}
        className="card-img-top"
        alt={`Capa do Album ${collectionName}`}
      />
      <div className="card-body ">
        <div>
          <h5 className="card-text">{artistName}</h5>
        </div>
        <div>
          <p className="card-text">{collectionName}</p>
        </div>
        <div>
          <p className="card-text">{collectionPrice}</p>
        </div>
        <div>
          <p className="card-text">{formattedDate}</p>
        </div>
        <div>
          <p className="card-text">{trackCount}</p>
        </div>
      </div>
    </div>
  );
}

export default AlbunsCard;
