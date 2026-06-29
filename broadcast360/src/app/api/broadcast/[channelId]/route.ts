import {
NextRequest,
NextResponse
}
from "next/server";


import {
BroadcastService
}
from "@/services/broadcast.service";




const service =
new BroadcastService();





export async function GET(


req:NextRequest,


context:{
params:Promise<{
channelId:string
}>
}


){


try{


const {channelId} =
await context.params;




const result =
await service.getCurrentBroadcast(
Number(channelId)
);




if(!result){


return NextResponse.json(

{
message:"No active broadcast"
},

{
status:404
}

);


}




return NextResponse.json(
result
);




}catch(error){



return NextResponse.json(

{

message:
"Broadcast failed"

},

{

status:500

}

);



}



}