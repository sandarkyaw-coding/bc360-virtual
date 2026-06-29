import {NextResponse} from "next/server";

import {prisma} from "@/lib/prisma";

export async function GET(){

 const ads =
 await prisma.advertisement.findMany({

   where:{
     active:true
   }

 });

 return NextResponse.json(ads);


}