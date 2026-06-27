"use client";

import Link from "next/link";

type Program = {
  id:number;
  title:string;
  type:string;
  allowAds:boolean;
  startTime:string;
  endTime:string;
};


export default function ProgramTable({
  programs
}:{
  programs:Program[]
}){


return (

<div className="bg-[#0B1026] rounded-2xl border border-white/10 overflow-hidden">


<table className="w-full">


<thead>

<tr className="border-b border-white/10 text-gray-400">


<th className="p-5 text-left">
Title
</th>


<th className="p-5 text-left">
Type
</th>


<th className="p-5 text-left">
Ads
</th>


<th className="p-5 text-left">
Time
</th>


<th className="p-5 text-left">
Action
</th>


</tr>


</thead>



<tbody>


{
programs.map(program=>(


<tr
key={program.id}
className="border-b border-white/10 hover:bg-white/5"
>



<td className="p-5 text-white">

{program.title}

</td>



<td className="p-5">


<span
className="
bg-[#106EE9]/20
text-blue-400
px-3
py-1
rounded-full
text-sm
"
>

{program.type}

</span>


</td>



<td className="p-5">


{
program.allowAds ? 

<span
className="
bg-green-500/20
text-green-400
px-3
py-1
rounded-full
"
>
YES
</span>

:

<span
className="
bg-red-500/20
text-red-400
px-3
py-1
rounded-full
"
>
NO
</span>

}


</td>



<td className="p-5 text-gray-300">

{new Date(program.startTime)
.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}

-

{new Date(program.endTime)
.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}


</td>




<td className="p-5 flex gap-3">


<Link

href={`/admin/programs//edit/${program.id}`}

className="
bg-[#400FD3]
px-4
py-2
rounded-lg
"

>

Edit

</Link>



<button

className="
bg-[#F41010]
px-4
py-2
rounded-lg
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


)

}