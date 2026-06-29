"use client";


import {useEffect,useState}
from "react";


import Link from "next/link";



type Schedule = {


id:number;

startTime:string;

endTime:string|null;


channel:{
name:string;
};


playlist:{
name:string;
};


};
async function deleteSchedule(id:number){


const confirmDelete =
confirm(
"Delete this schedule?"
);



if(!confirmDelete)
return;



await fetch(

`/api/schedules/${id}`,

{

method:"DELETE"

}

);

}

export default function SchedulePage(){



const [data,setData]=
useState<Schedule[]>([]);



useEffect(()=>{


fetch("/api/schedules")

.then(res=>res.json())

.then(setData);


},[]);






return (


<div className="p-6">


<div className="flex justify-between mb-6">


<h1 className="text-3xl font-bold">

Schedules

</h1>



<Link

href="/admin/schedules/create"

className="bg-blue-600 text-white px-4 py-2 rounded"

>

Create

</Link>



</div>





<table className="w-full border">


<thead>


<tr className="border">


<th className="p-3">

Channel

</th>


<th>

Playlist

</th>


<th>

Start

</th>


<th>

End

</th>


</tr>


</thead>





<tbody>


{

data.map(schedule=>(


<tr

key={schedule.id}

className="border"


>


<td className="p-3">

{schedule.channel.name}

</td>



<td>

{schedule.playlist.name}

</td>



<td>

{
new Date(
schedule.startTime
).toLocaleString()

}

</td>



<td>

{
schedule.endTime
?
new Date(
schedule.endTime
).toLocaleString()
:
"-"

}

</td>

<td>


<button

onClick={()=>deleteSchedule(schedule.id)}

className="
text-white
bg-[#F41010]
px-3
py-1
rounded
"

>

Delete

</button>


</td>



</tr>


))


}



</tbody>



</table>


</div>


);


}