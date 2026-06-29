import {NextRequest,NextResponse}
from "next/server";


import {ScheduleService}
from "@/services/schedule.service";



const service =
new ScheduleService();





export async function GET(

 req:NextRequest,

 context:{
 params:Promise<{
 id:string
 }>
}

){


const {id} =
await context.params;


const schedule =
await service.getScheduleById(
 Number(id)
);



return NextResponse.json(
 schedule
);


}








export async function PUT(

 req:NextRequest,

 context:{
 params:Promise<{
 id:string
 }>
}

){


try{


const {id} =
await context.params;


const body =
await req.json();



const updated =
await service.updateSchedule(

 Number(id),

 body

);



return NextResponse.json(
 updated
);



}catch(error){


return NextResponse.json(

{

message:
"Update failed"

},

{
status:400
}

);


}



}


export async function DELETE(

 req:NextRequest,

 context:{
 params:Promise<{
 id:string
 }>
}

){


try{


const {id} =
await context.params;



await service.deleteSchedule(
 Number(id)
);



return NextResponse.json({

message:"Deleted"

});



}catch(error){


return NextResponse.json(

{

message:"Delete failed"

},

{
status:500
}

);


}


}