import React, { useState } from "react";
import searchAlbumsAPI from "../../services/searchAbumsAPIs";
import { AlbumType } from "../../types";
import { Link } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [artistCollection, setArtistColletion] = useState<AlbumType[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')
  const [showTitle, setShowTitle] = useState(false);

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
      setLoading(false);
      setErrorMsg('Nenhum álbum foi encontrado');
      setArtistColletion([])
      return
    }

    setArtistColletion(collections);
    setShowTitle(true)
    setLoading(false);
  };

  const handleClick = async () => {
    return await getArtistCollecion(search);
  };

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
        {showTitle && <h1>{ `Resultado de álbuns de: ${search}` }</h1>}
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
                <Link to={`/album/${collectionId}`}
                  key={collectionId}>
                  <p>{ artistId }</p>
                  <p>{artistName}</p>
                  <p>{collectionId}</p>
                  <p>{collectionName}</p>
                  <p>{collectionPrice}</p>
                  <img src={artworkUrl100} alt={`capa do album ${collectionName}`} />
                  <p>{releaseDate}</p>
                  <p>{trackCount}</p>
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
