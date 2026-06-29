"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


type PlaylistItem = {

  id:number;

  type:string;

  order:number;

  duration:number | null;


  movie?:{
    title:string;
  } | null;


  episode?:{
    title:string;
  } | null;


  advertisement?:{
    title:string;
  } | null;

};



type Playlist = {

  id:number;

  name:string;

  totalDuration:number | null;


  program:{
    title:string;
  };


  items:PlaylistItem[];

};



function getTitle(item:PlaylistItem){

  return (
    item.movie?.title ||
    item.episode?.title ||
    item.advertisement?.title ||
    "Unknown"
  );

}



function formatDuration(seconds:number){

 const m =
 Math.floor(seconds / 60);


 const s =
 seconds % 60;


 return `${m}m ${s}s`;

}





export default function PlaylistViewPage(){


 const params = useParams();


 const playlistId =
 Number(params.id);



 const [playlist,setPlaylist] =
 useState<Playlist | null>(null);

async function handleDelete(id:number){


 const confirmDelete =
 window.confirm(
  "Delete this playlist item?"
 );


 if(!confirmDelete) return;



 await fetch(
  `/api/playlist-items/${id}`,
  {
    method:"DELETE"
  }
 );



 setPlaylist(prev => {

  if(!prev) return prev;


  return {

   ...prev,

   items:
   prev.items.filter(
    item=>item.id !== id
   )

  };

 });


}

 useEffect(()=>{


 async function load(){


 const res =
 await fetch(
 `/api/playlists/${playlistId}`
 );


 const data =
 await res.json();


 setPlaylist(data);


 }


 load();


 },[playlistId]);




 if(!playlist){

 return <div className="p-6">
 Loading...
 </div>

 }



 return (

 <div className="max-w-5xl mx-auto p-6">


 <div className="flex justify-between mb-6">


 <div>

 <h1 className="text-3xl font-bold">

 {playlist.name}

 </h1>


 <p>

 Program:
 {" "}
 {playlist.program.title}

 </p>


 </div>



 <Link

 href={`/admin/playlists/${playlistId}/items/create`}

 className="bg-blue-600 text-white px-4 py-2 rounded"

 >

 Add Item

 </Link>


 </div>





 <h2 className="text-xl font-bold mb-4">

 Broadcast Sequence

 </h2>




 {

 playlist.items.map(item=>(


<div

key={item.id}

className="border rounded p-4 flex justify-between"

>


<div>

<p className="font-bold">

{item.order}. {getTitle(item)}

</p>


<p className="text-gray-500">

{item.type}

</p>


</div>




<div className="flex flex-col items-end gap-2">


<p>

{formatDuration(item.duration ?? 0)}

</p>



<div className="flex gap-3">


<Link

href={`/admin/playlists/${playlistId}/items/${item.id}/edit`}

className="text-blue-600"

>

Edit

</Link>





<button

onClick={()=>handleDelete(item.id)}

className="text-red-600"

>

Delete

</button>



</div>


</div>



</div>

 ))

 }


 </div>


 )


}