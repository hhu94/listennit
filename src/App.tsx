import Bluebird from "bluebird";
import React, { Fragment, Suspense, useState } from "react";
import { Listing, Submission } from "snoowrap";
import "./App.css";
import { Player } from "./Player";
import { PlaylistLoader } from "./PlaylistLoader";
import { PlaylistEvent, Song } from "./types";
declare global {
  export interface Promise<T> extends Bluebird<T> {}
}

const App: React.FC = () => {
  const [playlistEvent, setPlaylistEvent] = useState<PlaylistEvent>({
    type: "refresh"
  });
  const [subreddit, setSubreddit] = useState<string>("lofi");
  const [listing, setListing] = useState<Listing<Submission>>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState(-1);
  const [playing, setPlaying] = useState<boolean>(false);
  const [lockCount, setLockCount] = useState<number>(3);

  const lock = (
    <button
      onClick={() => {
        setLockCount(lockCount - 1);
        setPlaying(!playing);
      }}
    >
      Press {lockCount > 1 ? `${lockCount} times` : "once"} to unlock
    </button>
  );

  return (
    <Fragment>
      {lockCount > 0 && lock}
      <div className={lockCount > 0 ? "app__hidden" : ""}>
        <input
          onKeyPress={e => {
            if (e.key === "Enter") {
              setSubreddit(e.currentTarget.value);
              setPlaylistEvent({ type: "refresh" });
              setCurrentSong(0);
            }
          }}
        />
        Current subreddit: {subreddit}
        <Player
          playing={playing}
          setPlaying={setPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          songs={songs}
          setPlaylistEvent={setPlaylistEvent}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <PlaylistLoader
            playlistEvent={playlistEvent}
            setPlaylistEvent={setPlaylistEvent}
            subreddit={subreddit}
            listing={listing}
            setListing={setListing}
            songs={songs}
            setSongs={setSongs}
            fetchMoreOptions={{ amount: 10, append: true }}
          />
        </Suspense>
        <button
          onClick={() => {
            setPlaylistEvent({ type: "fetchMore" });
          }}
        >
          Fetch more
        </button>
      </div>
    </Fragment>
  );
};

export default App;
