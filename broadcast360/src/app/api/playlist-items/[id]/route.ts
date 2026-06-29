import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function DELETE(

  req: Request,

  context: {
    params: Promise<{
      id:string
    }>
  }

){


  try{


    const { id } =
      await context.params;


    const itemId =
      Number(id);



    if(!itemId){

      return NextResponse.json(
        {
          message:"Invalid id"
        },
        {
          status:400
        }
      );

    }



    await prisma.playlistItem.delete({

      where:{
        id:itemId
      }

    });



    return NextResponse.json({

      message:"Deleted successfully"

    });



  }catch(error){


    return NextResponse.json(

      {
        message:
        error instanceof Error
        ? error.message
        : "Delete failed"
      },

      {
        status:500
      }

    );


  }


}