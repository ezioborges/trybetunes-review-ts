import React, { useState } from "react";
import searchAlbumsAPI from "../../services/searchAbumsAPIs";
import { AlbumType } from "../../types";
import { Link } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [artistCollection, setArtistColletion] = useState<AlbumType[]>([]);

  const validateSearch = (artist: string) => {
    return artist.length > 2;
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
    setDisabled(!validateSearch(target.value));
  };

  const getArtistCollecion = async (name: string) => {
    setLoading(true);
    const collections = await searchAlbumsAPI(name);

    if (!collections.length) {
      setErrorMsg("Nenhum álbum foi encontrado");
      setShowTitle(false);
      setArtistColletion([]);
      setLoading(false);
      return;
    }

    setArtistColletion(collections);
    setErrorMsg('')
    setShowTitle(true);
    setLoading(false);
  };

  const handleClick = async () => {
    setSearch("");
    setDisabled(true);
    return await getArtistCollecion(search);
  };

  
  const nameArtist = artistCollection.find((ar) => ar);
  const titleScream = (
    <h1>{`Resultado de álbuns de: ${nameArtist?.artistName}`}</h1>
  );
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <label htmlFor="search">
          <input
            name="search"
            type="text"
            data-testid="search-artist-input"
            value={search}
            onChange={handleChange}
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={disabled}
          onClick={handleClick}
        >
          Pesquisar
        </button>
      </div>
      <div>
        {showTitle && titleScream}
        {errorMsg && <h1>{errorMsg}</h1>}
        {!loading && (
          <ul>
            {artistCollection?.map(
              ({
                artistId,
                artistName,
                collectionId,
                collectionName,
                collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <Link to={`/album/${collectionId}`} key={collectionId}>
                  <div style={{ border: "1px solid red" }}>
                    <p>{artistId}</p>
                    <p>{artistName}</p>
                    <p>{collectionId}</p>
                    <p>{collectionName}</p>
                    <p>{collectionPrice}</p>
                    <img
                      src={artworkUrl100}
                      alt={`capa do album ${collectionName}`}
                    />
                    <p>{releaseDate}</p>
                    <p>{trackCount}</p>
                  </div>
                </Link>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
