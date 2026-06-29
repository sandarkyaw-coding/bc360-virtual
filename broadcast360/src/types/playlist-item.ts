export type PlaylistItemType =
  | "MOVIE"
  | "EPISODE"
  | "ADVERTISEMENT"
  | "NEWS"
  | "STREAM";



export interface CreatePlaylistItemInput {

  playlistId:number;

  type:PlaylistItemType;

  order:number;

  duration?:number;

  movieId?:number | null;

  episodeId?:number | null;

  advertisementId?:number | null;

  newsId?:number | null;

  streamId?:number | null;

}