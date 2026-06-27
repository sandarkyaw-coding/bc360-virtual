import { NextRequest, NextResponse } from "next/server";

import { PlaylistService } from "@/services/playlist.service";


const service =
 new PlaylistService();




// POST /api/playlists

export async function POST(
 req:NextRequest
){


 try{


   const body =
     await req.json();



   const playlist =
     await service.createPlaylist(body);



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