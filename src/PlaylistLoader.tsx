import { Listing, Submission } from "snoowrap";
import { FetchMoreOptions } from "snoowrap/dist/objects/Listing";
import { refreshSnoowrap } from "./SnoowrapCache";
import { convertToSongs, PlaylistEvent, Song } from "./types";

interface PlaylistLoaderProps {
  playlistEvent: PlaylistEvent;
  setPlaylistEvent: React.Dispatch<React.SetStateAction<PlaylistEvent>>;
  subreddit: string;
  listing?: Listing<Submission>;
  setListing: React.Dispatch<
    React.SetStateAction<Listing<Submission> | undefined>
  >;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  fetchMoreOptions: FetchMoreOptions;
}

let ongoingPromise: Promise<Listing<Submission>>;

export const PlaylistLoader: React.FC<PlaylistLoaderProps> = ({
  playlistEvent,
  setPlaylistEvent,
  subreddit,
  listing,
  setListing,
  songs,
  setSongs,
  fetchMoreOptions
}) => {
  if (playlistEvent.type === "ready") {
    return null;
  }

  if (ongoingPromise) {
    ongoingPromise.cancel();
  }

  const snoowrap = refreshSnoowrap();

  if (
    playlistEvent.type === "refresh" ||
    (listing === undefined && playlistEvent.type === "fetchMore")
  ) {
    const fetch = async () => {
      ongoingPromise = snoowrap
        .getSubreddit(subreddit)
        .getHot()
        .finally(() => setPlaylistEvent({ type: "ready" }));
      const tempListing = await ongoingPromise;
      setListing(tempListing);
      setSongs(convertToSongs(tempListing));
    };
    throw fetch();
  } else if (playlistEvent.type === "fetchMore" && listing !== undefined) {
    const fetchMore = async () => {
      let tempListing = listing;
      let tempSongs: Song[] = [];
      while (tempSongs.length <= songs.length) {
        ongoingPromise = ((tempListing
          // Assert that it's a Promise since there is a bug in the library typing.
          .fetchMore(fetchMoreOptions) as unknown) as Promise<
          Listing<Submission>
        >).finally(() => setPlaylistEvent({ type: "ready" }));
        tempListing = await ongoingPromise;
        tempSongs = convertToSongs(tempListing);
      }
      setListing(tempListing);
      setSongs(tempSongs);
    };
    throw fetchMore();
  }

  return null;
};
