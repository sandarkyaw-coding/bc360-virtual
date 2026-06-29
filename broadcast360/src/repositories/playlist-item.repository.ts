import { prisma } from "@/lib/prisma";
import type {CreatePlaylistItemInput} from "@/types/playlist-item";

export class PlaylistItemRepository {



 async create(data:CreatePlaylistItemInput){


 let duration = data.duration;


 if(data.movieId){


  const movie =
   await prisma.movie.findUnique({

    where:{
      id:data.movieId
    }

   });


  duration =
   movie?.duration ?? 0;

 }

 return prisma.playlistItem.create({

  data:{
    ...data,
    duration
  },


  include:{
    movie:true,
    episode:true,
    advertisement:true
  }


 });


}


 async findByPlaylist(
   playlistId:number
 ){


  return prisma.playlistItem.findMany({

    where:{
      playlistId
    },


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


  });


 }


}