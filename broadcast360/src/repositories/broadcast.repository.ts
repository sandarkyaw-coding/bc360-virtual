import { prisma } from "@/lib/prisma";


export class BroadcastRepository {


  async findActiveSchedule(
    channelId: number
  ) {


    const now = new Date();



    const schedule =
      await prisma.schedule.findFirst({



        where: {


          channelId,



          startTime: {
            lte: now
          },



          endTime: {
            gte: now
          }



        },



        include: {



          channel: true,



          playlist: {



            include: {



              items: {



                orderBy: {



                  order: "asc"



                },



                include: {



                  movie: true,


                  episode: true,


                  advertisement: true,


                  news: true,


                  stream: true



                }


              }


            }


          }


        }

      });



    return schedule;


  }


}