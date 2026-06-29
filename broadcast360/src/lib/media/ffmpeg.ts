import ffmpeg from "fluent-ffmpeg";
import path from "path";

type VideoInfo = {

duration:number;

thumbnail:string;

};


export function getVideoInfo(
filePath:string
):Promise<VideoInfo>{

return new Promise((resolve,reject)=>{

ffmpeg.ffprobe(

filePath,

(err,data)=>{

if(err){

reject(err);
return;
}

const duration = Math.floor(
data.format.duration ?? 0
);



resolve({

duration,

thumbnail:""

});


}

);


});


}

export function getVideoDuration(
  filePath: string
): Promise<number> {

  return new Promise((resolve, reject) => {

    ffmpeg.ffprobe(filePath, (err, data) => {

      if (err) {
        reject(err);
        return;
      }

      const duration = Math.floor(
        data.format.duration ?? 0
      );

      resolve(duration);

    });

  });

}

export function generateThumbnail(
  videoPath: string,
  outputPath: string
): Promise<string> {

  return new Promise((resolve, reject) => {

    ffmpeg(videoPath)
      .screenshots({
        timestamps: ["00:00:01"],
        filename: path.basename(outputPath),
        folder: path.dirname(outputPath),
        size: "320x180"
      })
      .on("end", () => {
        resolve(outputPath);
      })
      .on("error", (err) => {
        reject(err);
      });

  });

}

export function startFFmpegStream(
  files:string[],
  streamKey:string
){


return new Promise((resolve,reject)=>{


const command = ffmpeg();



files.forEach(file=>{


const realPath =
path.join(
process.cwd(),
"public",
file
);


command.input(realPath);


});



const inputs =
files.map((_,index)=>{

return `[${index}:v]`;

}).join("");




command


.complexFilter([

`${inputs}concat=n=${files.length}:v=1:a=0[outv]`

])


.outputOptions([

"-map",
"[outv]",


"-preset",
"veryfast",


"-b:v",
"1200k",


"-pix_fmt",
"yuv420p",


"-f",
"flv"

])



.videoCodec("libx264")



.on("start",cmd=>{

console.log(
"FFmpeg started"
);

console.log(cmd);

})


.on("end",()=>{


console.log(
"Playlist finished"
);


resolve(true);


})


.on("stderr", line => {
  console.log(line);
})

.on("error", err => {

  console.log("========== FFMPEG ERROR ==========");
  console.log(err.message);

  reject(err);

})


.save(

`rtmp://localhost/live/${streamKey}`

);



});

}