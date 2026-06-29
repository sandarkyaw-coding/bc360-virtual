import { prisma } from "@/lib/prisma";
import type { CreateScheduleInput } from "@/types/schedule";

export class ScheduleRepository {



async findAll(){


 return prisma.schedule.findMany({


  include:{


   channel:true,


   playlist:true


  },


  orderBy:{


   startTime:"asc"


  }


 });


}






async findById(id:number){


 return prisma.schedule.findUnique({


  where:{id},


  include:{


   channel:true,


   playlist:true


  }


 });


}






async create(data: CreateScheduleInput){

 return prisma.schedule.create({


  data:{


   channelId:data.channelId,


   playlistId:data.playlistId,


   startTime:new Date(data.startTime),


   endTime:data.endTime
   ? new Date(data.endTime)
   : null


  },


  include:{


   channel:true,


   playlist:true


  }


 });


}








async update(
 id:number,
 data:CreateScheduleInput
){


 return prisma.schedule.update({


  where:{id},


  data:{


   channelId:data.channelId,


   playlistId:data.playlistId,


   startTime:new Date(data.startTime),


   endTime:data.endTime
   ? new Date(data.endTime)
   : null


  },


  include:{


   channel:true,


   playlist:true


  }


 });


}







async delete(id:number){


 return prisma.schedule.delete({


  where:{id}


 });


}



}