import { NextRequest, NextResponse } from "next/server";

import { PlaylistService } from "@/services/playlist.service";


const service =
  new PlaylistService();




// GET /api/playlists/1

export async function GET(

  req:NextRequest,

  context:{
    params:Promise<{
      id:string
    }>
  }

){


  try{

    const { id } =
      await context.params;

    const playlistId =
      Number(id);

    const playlist =
      await service.getPlaylistById(
        playlistId
      );



    if(!playlist){


      return NextResponse.json(

        {
          message:"Playlist not found"
        },

        {
          status:404
        }

      );


    }

    return NextResponse.json(
      playlist
    );

  }catch(error){

    return NextResponse.json(

      {
        message:
          error instanceof Error
          ? error.message
          : "Failed to get playlist"
      },

      {
        status:500
      }

    );


  }


}