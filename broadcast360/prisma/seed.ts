import {
  PrismaClient,
  Role,
  ProgramType,
  BroadcastStatus,
  PlaylistItemType,
  ScheduleStatus
} from "../src/generated/prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";


const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});


const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });



async function main() {


  // =====================
  // USERS
  // =====================

  await prisma.user.createMany({

    data:[
      {
        name:"Admin User",
        email:"admin@test.com",
        password:"123456",
        role:Role.ADMIN
      },
      {
        name:"Viewer One",
        email:"viewer@test.com",
        password:"123456",
        role:Role.GUEST
      }
    ]

  });



  // =====================
  // CHANNELS
  // =====================


  const channel1 =
  await prisma.channel.create({

    data:{
      name:"Broadcast360 Movies",
      description:"Movie channel",
      country:"Myanmar",
      logo:"/logos/movie.png"
    }

  });



  const channel2 =
  await prisma.channel.create({

    data:{
      name:"Broadcast360 News",
      description:"News channel",
      country:"Myanmar",
      logo:"/logos/news.png"
    }

  });



  // =====================
  // STREAMS
  // =====================


  await prisma.stream.create({

    data:{
      channelId:channel1.id,
      url:"rtmp://localhost/movie",
      protocol:"RTMP",
      status:"offline"
    }

  });



  await prisma.stream.create({

    data:{
      channelId:channel2.id,
      url:"rtmp://localhost/news",
      protocol:"RTMP",
      status:"offline"
    }

  });



  // =====================
  // MOVIES
  // =====================


  const movie1 =
  await prisma.movie.create({

    data:{
      title:"Bird Movie",
      description:"Adventure movie",
      genre:"Adventure",
      thumbnail:"/movies/bird.jpg",
      videoUrl:"/videos/movies/bird.mp4",
      duration:2700,
      releaseYear:2026
    }

  });


  const movie2 =
  await prisma.movie.create({

    data:{
      title:"Action Hero",
      description:"Action movie",
      genre:"Action",
      thumbnail:"/movies/action.jpg",
      videoUrl:"/videos/movies/action.mp4",
      duration:5400,
      releaseYear:2025
    }

  });



  // =====================
  // SERIES
  // =====================


  const series =
  await prisma.series.create({

    data:{
      title:"The Mask Singer Myanmar",
      description:"Entertainment show",
      genre:"Reality",
      thumbnail:"/series/mask.jpg"
    }

  });



  const episode1 =
  await prisma.episode.create({

    data:{
      seriesId:series.id,
      title:"Episode 1",
      episodeNo:1,
      duration:5400,
      videoUrl:"/videos/series/mask-ep1.mp4"
    }

  });



  const episode2 =
  await prisma.episode.create({

    data:{
      seriesId:series.id,
      title:"Episode 2",
      episodeNo:2,
      duration:5400,
      videoUrl:"/videos/series/mask-ep2.mp4"
    }

  });



  // =====================
  // ADS
  // =====================


  const ad1 =
  await prisma.advertisement.create({

    data:{
      title:"Coca Cola",
      videoUrl:"/videos/ads/coca.mp4",
      duration:30
    }

  });


  const ad2 =
  await prisma.advertisement.create({

    data:{
      title:"MPT Internet",
      videoUrl:"/videos/ads/mpt.mp4",
      duration:45
    }

  });



  // =====================
  // NEWS
  // =====================


  const news =
  await prisma.news.create({

    data:{
      channelId:channel2.id,
      title:"Morning News",
      content:"Daily news",
      image:"/news/news.jpg",
      videoUrl:"/videos/news/morning.mp4",
      type:"prepared"
    }

  });



  // =====================
  // PROGRAMS
  // =====================

  const movieProgram =
  await prisma.program.create({

    data:{
      title:"Movie Night",
      channelId: channel1.id,
      type:ProgramType.MOVIE,
      description:"Night movie show"
    }

  });



  const maskProgram =
  await prisma.program.create({

    data:{
      title:"The Mask Singer",
      channelId: channel1.id,
      type:ProgramType.ENTERTAINMENT,
      description:"Weekly entertainment show"
    }

  });



  const newsProgram =
  await prisma.program.create({

    data:{
      title:"Morning News",
      channelId: channel1.id,
      type:ProgramType.NEWS,
      description:"Daily news program"
    }

  });



  // =====================
  // PLAYLISTS
  // =====================


  const moviePlaylist =
  await prisma.playlist.create({

    data:{
      name:"Friday Movie Playlist",
      programId:movieProgram.id,
      totalDuration:5460
    }

  });



  const maskPlaylist =
  await prisma.playlist.create({

    data:{
      name:"Mask Singer Episode Playlist",
      programId:maskProgram.id,
      totalDuration:6300
    }

  });



  const newsPlaylist =
  await prisma.playlist.create({

    data:{
      name:"Morning News Playlist",
      programId:newsProgram.id,
      totalDuration:3600
    }

  });



  // =====================
  // PLAYLIST ITEMS
  // =====================


  await prisma.playlistItem.createMany({

    data:[

      {
        playlistId:moviePlaylist.id,
        order:1,
        type:PlaylistItemType.MOVIE,
        movieId:movie1.id,
        duration:2700
      },

      {
        playlistId:moviePlaylist.id,
        order:2,
        type:PlaylistItemType.ADVERTISEMENT,
        advertisementId:ad1.id,
        duration:30
      },

      {
        playlistId:moviePlaylist.id,
        order:3,
        type:PlaylistItemType.MOVIE,
        movieId:movie2.id,
        duration:5400
      },


      {
        playlistId:maskPlaylist.id,
        order:1,
        type:PlaylistItemType.EPISODE,
        episodeId:episode1.id,
        duration:5400
      },


      {
        playlistId:maskPlaylist.id,
        order:2,
        type:PlaylistItemType.ADVERTISEMENT,
        advertisementId:ad2.id,
        duration:45
      },


      {
        playlistId:newsPlaylist.id,
        order:1,
        type:PlaylistItemType.NEWS,
        newsId:news.id,
        duration:3600
      }

    ]

  });



  // =====================
  // SCHEDULE
  // =====================


  await prisma.schedule.create({

    data:{
      channelId:channel1.id,
      playlistId:moviePlaylist.id,
      startTime:new Date("2026-06-27T02:00:00"),
      endTime:new Date("2026-06-27T04:00:00"),
      status:ScheduleStatus.SCHEDULED
    }

  });



  await prisma.schedule.create({

    data:{
      channelId:channel2.id,
      playlistId:newsPlaylist.id,
      startTime:new Date("2026-06-27T06:00:00"),
      endTime:new Date("2026-06-27T07:00:00"),
      status:ScheduleStatus.SCHEDULED
    }

  });



  // =====================
  // BROADCAST SESSION
  // =====================


  await prisma.broadcastSession.create({

    data:{
      channelId:channel1.id,
      status:BroadcastStatus.STOPPED
    }

  });



  // =====================
  // RECORDING
  // =====================


  await prisma.recording.create({

    data:{
      channelId:channel1.id,
      title:"Movie Recording",
      fileUrl:"/recordings/movie1.mp4",
      duration:3600,
      startedAt:new Date(),
      endedAt:new Date()
    }

  });



  console.log("Seed completed");


}



main()
.catch(console.error)
.finally(()=>prisma.$disconnect());