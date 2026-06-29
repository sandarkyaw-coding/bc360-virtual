import { ScheduleRepository }
from "@/repositories/schedule.repository";


import type {
 CreateScheduleInput
}
from "@/types/schedule";



export class ScheduleService{


private repository =
 new ScheduleRepository();




async getSchedules(){


 return this.repository.findAll();


}





async getScheduleById(
 id:number
){


 return this.repository.findById(id);


}





async createSchedule(
 data:CreateScheduleInput
){


 if(!data.channelId){

  throw new Error(
   "Channel required"
  );

 }



 if(!data.playlistId){

  throw new Error(
   "Playlist required"
  );

 }



 return this.repository.create(
  data
 );


}





async updateSchedule(
 id:number,
 data:CreateScheduleInput
){


 return this.repository.update(
  id,
  data
 );


}





async deleteSchedule(
 id:number
){


 return this.repository.delete(id);


}



}