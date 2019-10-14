import { Submission } from "snoowrap";

export interface PlaylistEvent {
  type: "refresh" | "fetchMore" | "ready";
}

export interface Song {
  title: string;
  commentsUrl: string;
  url: string;
  platform: Platform;
  votes: number;
}

export type Platform = "youtube.com" | "soundcloud.com";

export const isPlatform = (object: any): object is Platform => {
  return object === "youtube.com" || object === "soundcloud.com";
};

export const convertToSongs = (
  submissions: Submission[] | undefined
): Song[] => {
  if (submissions === undefined) {
    return [];
  }

  return submissions.reduce<Song[]>((acc: Song[], submission: Submission) => {
    const song = convertToSong(submission);
    return song === undefined ? acc : acc.concat(song);
  }, []);
};

export const convertToSong = (submission: Submission): Song | undefined => {
  if (
    submission.secure_media === null ||
    !isPlatform(submission.secure_media.type)
  ) {
    return undefined;
  }

  return {
    title: submission.title,
    commentsUrl: submission.permalink,
    url: submission.url,
    platform: submission.secure_media.type,
    votes: submission.score
  };
};
