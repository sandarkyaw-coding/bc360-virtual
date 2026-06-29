"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Channel = {
  id:number;
  name:string;
};


type Playlist = {
  id:number;
  name:string;
};



export default function ScheduleForm(){


const router = useRouter();



const [channels,setChannels] =
useState<Channel[]>([]);


const [playlists,setPlaylists] =
useState<Playlist[]>([]);




const [form,setForm] =
useState({

 channelId:"",

 playlistId:"",

 startDate:"",

 startTime:"",

 endDate:"",

 endTime:""

});





useEffect(()=>{


async function load(){


try{


const channelRes =
await fetch("/api/channels");


const playlistRes =
await fetch("/api/playlists");



const channelData =
await channelRes.json();


const playlistData =
await playlistRes.json();



console.log("channels",channelData);

console.log("playlists",playlistData);



setChannels(
 Array.isArray(channelData)
 ? channelData
 : []
);



setPlaylists(
 Array.isArray(playlistData)
 ? playlistData
 : []
);



}catch(error){

console.error(error);

}



}



load();



},[]);








function handleChange(
e:React.ChangeEvent<
HTMLInputElement |
HTMLSelectElement
>
){


setForm({

...form,


[e.target.name]:

e.target.value


});


}







async function submit(
e:React.FormEvent
){


e.preventDefault();


const fullStartTime = 
form.startDate && form.startTime 
? `${form.startDate}T${form.startTime}` 
: "";


const fullEndTime = 
form.endDate && form.endTime 
? `${form.endDate}T${form.endTime}` 
: null;



const res =
await fetch(
"/api/schedules",
{

method:"POST",

headers:{


"Content-Type":
"application/json"

},


body:JSON.stringify({

channelId:
Number(form.channelId),


playlistId:
Number(form.playlistId),


startTime:
fullStartTime,


endTime:
fullEndTime


})


}

);



if(res.ok){


router.push(
"/admin/schedules"
);


}else{


const error =
await res.json();


alert(error.message);


}


}







return (

<form

onSubmit={submit}

className="space-y-5 max-w-xl"

>



<div>


<label className="block mb-1">

Channel

</label>



<select

name="channelId"

value={form.channelId}

onChange={handleChange}

className="border p-2 w-full rounded"

>


<option value="">

Select Channel

</option>



{

channels.map(channel=>(


<option

key={channel.id}

value={channel.id}

>


{channel.name}


</option>


))

}



</select>


</div>








<div>


<label className="block mb-1">

Playlist

</label>



<select

name="playlistId"

value={form.playlistId}

onChange={handleChange}

className="border p-2 w-full rounded"

>


<option value="">

Select Playlist

</option>



{

playlists.map(playlist=>(


<option

key={playlist.id}

value={playlist.id}

>


{playlist.name}


</option>


))

}



</select>


</div>








<div className="grid grid-cols-2 gap-4">

<div>

<label className="block mb-1">

Start Date

</label>

<input

type="date"

name="startDate"

value={form.startDate}

onChange={handleChange}

className="border border-zinc-700 p-2 w-full rounded bg-zinc-900 text-white"

/>

</div>



<div>

<label className="block mb-1">

Start Time

</label>

<input

type="time"

name="startTime"

value={form.startTime}

onChange={handleChange}

className="border border-zinc-700 p-2 w-full rounded bg-zinc-900 text-white"

/>

</div>

</div>








<div className="grid grid-cols-2 gap-4">

<div>

<label className="block mb-1">

End Date

</label>

<input

type="date"

name="endDate"

value={form.endDate}

onChange={handleChange}

className="border border-zinc-700 p-2 w-full rounded bg-zinc-900 text-white"

/>

</div>



<div>

<label className="block mb-1">

End Time

</label>

<input

type="time"

name="endTime"

value={form.endTime}

onChange={handleChange}

className="border border-zinc-700 p-2 w-full rounded bg-zinc-900 text-white"

/>

</div>

</div>








<button

type="submit"

className="bg-blue-600 text-white px-5 py-2 rounded"

>

Create Schedule

</button>



</form>

);


}