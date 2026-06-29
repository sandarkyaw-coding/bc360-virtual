import { NextRequest,NextResponse }
from "next/server";

import { PlaylistItemService }
from "@/services/playlist-item.service";

const service =
 new PlaylistItemService();

// POST /api/playlist-items

export async function POST(
 req:NextRequest
){
 try{
  const body = await req.json();

  const item =await service.createItem(body);

  return NextResponse.json(

    item,

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
    :"Create failed"

   },

   {
    status:400
   }
  );
 }

}