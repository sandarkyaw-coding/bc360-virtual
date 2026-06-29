import { PlaylistItemRepository } 
from "@/repositories/playlist-item.repository";
import type {CreatePlaylistItemInput} from "@/types/playlist-item";



export class PlaylistItemService{


 private repository =
  new PlaylistItemRepository();

 async createItem(data:CreatePlaylistItemInput){


   if(!data.playlistId){

    throw new Error(
      "Playlist id required"
    );

   }



   return this.repository.create(
    data
   );

 }




 async getItems(
  playlistId:number
 ){


  return this.repository.findByPlaylist(
    playlistId
  );


 }



}