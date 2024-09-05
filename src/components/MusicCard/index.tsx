import { songsColletion } from "../../types";

function MusicCard({
  artistName,
  collectionName,
  trackName,
  previewUrl,
}: songsColletion) {
  return (
    <div style={{ border: "1px solid black" }}>
      <p>{artistName}</p>
      <p>{collectionName}</p>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={previewUrl} controls>
        <track kind="captions" />O seu navegador não suporta o elemento{" "}
        <code>audio</code>.
      </audio>
    </div>
  );
}

export default MusicCard;
