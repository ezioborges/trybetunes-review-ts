import { useState } from "react";
import searchAlbumsAPI from "../services/searchAbumsAPIs";
import { validateSearch } from "../utils/validate";
import Loading from "../components/Loading";
import { AlbumType } from "../types";
import { Link } from "react-router-dom";
import AlbunsCard from "../components/AbumCard";

import '../styles/search.css';

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
    setErrorMsg("");
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
    <>
      <div className="d-flex justify-content-center p-4 mt-3 bg-danger-subtle">
        <label htmlFor="search">
          Pesquisa:
          <input
            type="text"
            value={search}
            onChange={handleChange}
            className="mx-4"
          />
          <button
            data-testid="search-artist-button"
            className="btn btn-primary"
            disabled={disabled}
            onClick={handleClick}
          >
            Pesquisar
          </button>
        </label>
      </div>
      <div className="d-flex justify-content-center mt-2">
        {showTitle && titleScream}
      </div>
      <div className="d-flex justify-content-center">
        {errorMsg && <h1>{errorMsg}</h1>}
      </div>
      {!loading && (
        <ul>
          <div
            className="d-flex flex-wrap"
            data-bs-spy="scroll"
          >
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
                <Link to={`/album/${collectionId}`} key={collectionId} className="link-style">
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
          </div>
        </ul>
      )}
    </>
  );
}

export default Search;
