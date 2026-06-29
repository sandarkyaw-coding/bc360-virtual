"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



type Broadcast = {

channel:{
 name:string;
};


currentItem?:{

 type:string;

 movie?:{
  title:string;
  videoUrl?:string;
 };

 episode?:{
  title:string;
  videoUrl?:string;
 };

 advertisement?:{
  title:string;
  videoUrl?:string;
 };


};


position:number;


};





export default function WatchPage(){



const params =
useParams();



const channelId =
Number(params.id);




const [broadcast,setBroadcast] =
useState<Broadcast | null>(null);





useEffect(()=>{


async function load(){


const res =
await fetch(
`/api/broadcast/${channelId}`
);



const data =
await res.json();



setBroadcast(data);



}



load();



},[channelId]);





if(!broadcast){


return (

<div className="p-10 text-white">

Loading...

</div>

);


}






const item =
broadcast.currentItem;



const videoUrl =

item?.movie?.videoUrl ||

item?.episode?.videoUrl ||

item?.advertisement?.videoUrl;






return (



<div className="min-h-screen bg-[#010312] p-6">





<h1 className="text-white text-3xl mb-5">


{broadcast.channel.name}


</h1>





<div className="bg-black rounded overflow-hidden">



{

videoUrl ? (


<video


src={videoUrl}


controls


autoPlay


className="w-full"

/>



):(



<div className="h-[500px] flex items-center justify-center text-white">


No video available


</div>


)


}



</div>







<div className="mt-5 bg-[#0B1026] p-5 rounded">


<h2 className="text-white text-xl">


Now Playing


</h2>



<p className="text-white mt-2">


{

item?.movie?.title ||

item?.episode?.title ||

item?.advertisement?.title ||

"Unknown"


}


</p>



</div>






</div>



);


}