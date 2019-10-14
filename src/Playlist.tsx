import React from "react";
import "./Playlist.css";
import { Song } from "./types";

export interface PlaylistProps {
  songs: Song[];
  currentSong: number;
  setCurrentSong: React.Dispatch<React.SetStateAction<number>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Playlist: React.FC<PlaylistProps> = ({
  songs,
  currentSong,
  setCurrentSong,
  setPlaying
}) => {
  const playlist = [];
  for (const [index, song] of songs.entries()) {
    let playlistClasses = "playlist-entry";
    if (index === currentSong) {
      playlistClasses += " playlist-entry__playing";
    }
    playlist.push(
      <li className={playlistClasses} key={index}>
        <button
          className="playlist-entry__button"
          onClick={() => {
            setCurrentSong(index);
            setPlaying(true);
          }}
        >
          {song.title}
        </button>
        {song.platform}
      </li>
    );
  }
  return <div className="playlist">{playlist}</div>;
};
