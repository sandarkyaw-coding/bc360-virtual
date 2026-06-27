import { prisma } from "@/lib/prisma";


export const scheduleRepository = {


async findAll(){

 return prisma.schedule.findMany({

  include:{
    channel:true,
    program:{
      include:{
        items:true
      }
    }
  },

  orderBy:{
    startTime:"asc"
  }

 });

},



async findById(id:number){

 return prisma.schedule.findUnique({

  where:{
    id
  },

  include:{
    channel:true,

    program:{
      include:{
        items:true
      }
    }

  }

 });

},



async create(data:any){

 return prisma.schedule.create({

  data

 });

},



async update(
 id:number,
 data:any
){

 return prisma.schedule.update({

  where:{
    id
  },

  data

 });

},



async delete(id:number){

 return prisma.schedule.delete({

  where:{
    id
  }

 });

}


}