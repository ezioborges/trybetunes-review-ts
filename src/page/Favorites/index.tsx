import { useEffect, useState } from "react";
import { readFavoriteSongs } from "../../services/favoriteSongsAPI";
import { songsColletion } from "../../types";
import MusicCard from "../../components/MusicCard";

function Favorites() {
    const [favSongs, setFavSongs] = useState<songsColletion[]>([])
    const [isLoad, setIsLoad] = useState(false)


    const getFavSongs = async () => {
        setIsLoad(true);
        const songs = await readFavoriteSongs();
        setFavSongs(songs)
        setIsLoad(false);
    }

    useEffect(() => {
        const readFav = async () => {
            getFavSongs()
        }
        readFav()
    }, [])

    if(isLoad) return <h1>Loading...</h1>

    
    return (
        <div>
            <h1>Sua musicas Favoritas</h1>
            <ul>
                {
                    !isLoad && (
                        favSongs.map(({ artistName, collectionName, previewUrl, trackId, trackName }, i) => (
                            <MusicCard
                                key={i}
                                artistName={artistName}
                                collectionName={collectionName}
                                previewUrl={previewUrl}
                                trackId={trackId}
                                trackName={trackName}
                            />
                        ))
                    ) 
                }
            </ul>
        </div>
    );
 };

export default Favorites;
