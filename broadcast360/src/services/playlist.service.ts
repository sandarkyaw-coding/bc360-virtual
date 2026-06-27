import { PlaylistRepository } from "@/repositories/playlist.repository";


export class PlaylistService{


 private repository =
    new PlaylistRepository();

 async createPlaylist(data:{
    name:string;
    programId:number;
 }){
    if(!data.name){

      throw new Error(
        "Playlist name is required"
      );

    }

    return this.repository.create(data);
 }

 async getPlaylists(programId:number){
    return this.repository.findByProgram(
      programId
    );


 }



 async getPlaylist(id:number){


    const playlist =
      await this.repository.findById(id);



    if(!playlist){

      throw new Error(
        "Playlist not found"
      );

    }


    return playlist;


 }



 async deletePlaylist(id:number){


    return this.repository.delete(id);


 }



}