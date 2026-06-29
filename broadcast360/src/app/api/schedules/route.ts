import { NextRequest,NextResponse }
from "next/server";


import { ScheduleService }
from "@/services/schedule.service";



const service =
new ScheduleService();





export async function GET(){


 const schedules =
 await service.getSchedules();


 return NextResponse.json(
  schedules
 );


}





export async function POST(
 req:NextRequest
){


 try{


 const body =
 await req.json();



 const schedule =
 await service.createSchedule(
  body
 );



 return NextResponse.json(

  schedule,

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