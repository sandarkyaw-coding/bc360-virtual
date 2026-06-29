import { prisma } from "@/lib/prisma";

import {
  startFFmpegStream
}
from "@/lib/media/ffmpeg";



export async function checkBroadcast(){



const now =
new Date();




const schedules =
await prisma.schedule.findMany({


where:{


startTime:{
  lte:now
},


endTime:{
  gte:now
}


},



include:{


channel:true,



playlist:{


include:{


items:{


orderBy:{


order:"asc"


},



include:{


movie:true,

episode:true,

advertisement:true,

news:true,

stream:true


}


}


}


}


}


});





for(
const schedule of schedules
){



console.log(
"Playing channel:",
schedule.channel.name
);



if(!schedule.channel.streamKey){


console.log(
"No stream key"
);


continue;


}



const videos:string[] = [];




for(
const item of schedule.playlist.items
){



let filePath:string | null = null;




if(item.movie?.videoUrl){

filePath =
item.movie.videoUrl;

}



if(item.episode?.videoUrl){

filePath =
item.episode.videoUrl;

}




if(filePath){


videos.push(
filePath
);


}



}




if(videos.length === 0){


console.log(
"No videos in playlist"
);


continue;


}




console.log(
"Playlist items:",
videos
);




startFFmpegStream(


videos,


schedule.channel.streamKey


);



}



}