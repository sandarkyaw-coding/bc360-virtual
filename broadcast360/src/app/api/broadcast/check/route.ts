import { NextResponse } from "next/server";

import {
 checkBroadcast
}
from "@/workers/broadcast.worker";



export async function GET(){


try{


const result =
await checkBroadcast();



return NextResponse.json({

message:"broadcast checked",

result


});


}catch(error){


return NextResponse.json({

message:
error instanceof Error
? error.message
:"failed"


},{
status:500
});


}


}