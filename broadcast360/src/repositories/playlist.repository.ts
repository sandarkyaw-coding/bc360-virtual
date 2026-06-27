import {prisma} from "@/lib/prisma";

export class PlaylistRepository {


  async create(data:{
    name:string;
    programId:number;
  }){


    return prisma.playlist.create({

      data:{

        name:data.name,

        programId:data.programId

      },


      include:{

        program:true

      }

    });

  }




  async findByProgram(programId:number){


    return prisma.playlist.findMany({

      where:{
        programId
      },


      include:{

        items:true

      }

    });


  }




  async findById(id:number){


    return prisma.playlist.findUnique({

      where:{
        id
      },


      include:{

        items:true,

        program:true

      }

    });


  }



  async delete(id:number){


    return prisma.playlist.delete({

      where:{
        id
      }

    });


  }



}