import { NextRequest, NextResponse } from "next/server";

import { PlaylistService } from "@/services/playlist.service";


const service = new PlaylistService();



// GET /api/playlists
// GET /api/playlists?programId=3

export async function GET(
  req: NextRequest
) {

  try {

    const { searchParams } =
      new URL(req.url);

    const programId =
      searchParams.get("programId");


    let playlists;



    if(programId){


      playlists =
        await service.getPlaylists(
          Number(programId)
        );


    }else{


      playlists =
        await service.getAllPlaylists();


    }



    return NextResponse.json(
      playlists
    );



  } catch(error){


    return NextResponse.json(

      {
        message:
          error instanceof Error
          ? error.message
          : "Failed to fetch playlists"
      },

      {
        status:500
      }

    );


  }

}




// POST /api/playlists

export async function POST(
  req:NextRequest
){

  try{


    const body =
      await req.json();



    const playlist =
      await service.createPlaylist(
        body
      );



    return NextResponse.json(

      playlist,

      {
        status:201
      }

    );



  }catch(error){


    return NextResponse.json(

      {
        message:
          error instanceof Error
          ? error.message
          : "Create failed"
      },

      {
        status:400
      }

    );


  }


}