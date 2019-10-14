import React, { Fragment, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import SoundCloudPlayer from "react-player/lib/players/SoundCloud";
import YouTubePlayer from "react-player/lib/players/YouTube";
import "./Player.css";
import { Playlist } from "./Playlist";
import { Platform, PlaylistEvent, Song } from "./types";

export interface PlayerProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentSong: number;
  setCurrentSong: React.Dispatch<React.SetStateAction<number>>;
  songs: Song[];
  setPlaylistEvent: React.Dispatch<React.SetStateAction<PlaylistEvent>>;
}

export const Player: React.FC<PlayerProps> = ({
  playing,
  setPlaying,
  currentSong,
  setCurrentSong,
  songs,
  setPlaylistEvent
}) => {
  const [volume, setVolume] = useState<number>(1);
  const [muted, setMuted] = useState<boolean>(false);
  const currentPlatform =
    songs[currentSong] === undefined ? undefined : songs[currentSong].platform;

  const onEnded = () => {
    if (songs[currentSong + 1] === undefined) {
      setPlaylistEvent({ type: "fetchMore" });
    }
    setCurrentSong(currentSong + 1);
  };

  let ref = React.createRef<ReactPlayer>();

  const playerProps = (targetPlatform: Platform): ReactPlayerProps =>
    currentPlatform === targetPlatform
      ? {
          ref: ref,
          url: songs[currentSong].url,
          volume: volume,
          muted: muted,
          playing: playing,
          onPlay: () => setPlaying(true),
          onPause: () => setPlaying(false),
          onReady: () => setTimeout(() => setPlaying(true), 100),
          onEnded: onEnded,
          onError: onEnded,
          controls: true
        }
      : {
          url: platformDefaultUrls[targetPlatform],
          volume: volume,
          muted: true,
          playing: playing,
          loop: true,
          controls: true
        };

  return (
    <Fragment>
      <div className="react-players__hidden">
        <YouTubePlayer {...playerProps("youtube.com")} />
        <SoundCloudPlayer {...playerProps("soundcloud.com")} />
      </div>
      <button
        onClick={() =>
          setCurrentSong(currentSong > 0 ? currentSong - 1 : currentSong)
        }
      >
        Previous
      </button>
      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Pause" : "Play"}
      </button>
      <button onClick={onEnded}>Next</button>
      <button
        onClick={() => {
          if (ref.current) {
            ref.current.seekTo(ref.current.getDuration() - 5);
          }
        }}
      >
        Skip to end
      </button>
      <button onClick={() => setMuted(!muted)}>
        {muted ? "Unmute" : "Mute"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue={volume}
        onChange={e => setVolume(parseFloat(e.currentTarget.value))}
      />
      <Playlist
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setPlaying={setPlaying}
      />
    </Fragment>
  );
};

const platformDefaultUrls: { [key in Platform]: string } = {
  "youtube.com": "https://www.youtube.com/watch?v=GlCmAC4MHek",
  "soundcloud.com": "https://soundcloud.com/seucheu/john-cage-433-8-bit-version"
};
