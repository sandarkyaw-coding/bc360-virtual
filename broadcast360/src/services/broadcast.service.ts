import { BroadcastRepository }
from "@/repositories/broadcast.repository";


import { startFFmpegStream }
from "@/lib/media/ffmpeg";



export class BroadcastService {


private repository =
new BroadcastRepository();



async startBroadcast(
channelId:number
){


const schedule =
await this.repository.findActiveSchedule(
channelId
);



if(!schedule){

throw new Error(
"No active schedule"
);

}



if(!schedule.channel.streamKey){

throw new Error(
"No stream key"
);

}



const videos:string[] = [];



for(
const item of schedule.playlist.items
){



if(item.movie?.videoUrl){

videos.push(
item.movie.videoUrl
);

}



if(item.episode?.videoUrl){

videos.push(
item.episode.videoUrl
);

}


}



console.log(
"Broadcast playlist:",
videos
);



await startFFmpegStream(

videos,

schedule.channel.streamKey

);



}


}