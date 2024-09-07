import React, { useState } from "react";
import searchAlbumsAPI from "../../services/searchAbumsAPIs";
import { AlbumType } from "../../types";
import { Link } from "react-router-dom";
import AlbunsCard from "../../components/AlbunsCard";
import Loading from "../../components/Loading";
import { validateSearch } from "../../utils/validate";

function Search() {
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [artistCollection, setArtistColletion] = useState<AlbumType[]>([]);



  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
    setDisabled(validateSearch(target.value));
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
  if (loading) return <Loading />;

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
                  <AlbunsCard
                    artistId={artistId}
                    artistName={artistName}
                    collectionId={collectionId}
                    collectionName={collectionName}
                    collectionPrice={collectionPrice}
                    artworkUrl100={artworkUrl100}
                    releaseDate={releaseDate}
                    trackCount={trackCount}
                  />
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
