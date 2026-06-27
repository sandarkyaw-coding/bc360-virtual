"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


type PlaylistItem = {

  id:number;

  type:string;

  order:number;

  duration:number | null;


  movie?:{
    title:string;
  } | null;


  advertisement?:{
    title:string;
  } | null;


};



type Playlist = {

  id:number;

  name:string;

  totalDuration:number | null;


  program:{
    title:string;
  };


  items:PlaylistItem[];

};




export default function PlaylistDetailsPage(){


  const params = useParams();


  const playlistId =
    Number(params.playlistId);



  const [playlist,setPlaylist] =
    useState<Playlist | null>(null);



  useEffect(()=>{


    async function loadPlaylist(){


      try{


        const res =
          await fetch(
            `/api/playlists/${playlistId}`
          );


        const data =
          await res.json();


        setPlaylist(data);



      }catch(error){

        console.error(error);

      }


    }



    loadPlaylist();



  },[playlistId]);






  if(!playlist){


    return (

      <div className="p-6">

        Loading...

      </div>

    );

  }







  return (

    <div className="max-w-5xl mx-auto p-6">


      <div className="flex justify-between mb-6">


        <div>


          <h1 className="text-3xl font-bold">

            {playlist.name}

          </h1>



          <p className="text-gray-600">

            Program:

            {" "}

            {playlist.program.title}

          </p>


        </div>





        <Link


          href={`/admin/playlists/${playlistId}/items/create`}


          className="bg-blue-600 text-white px-4 py-2 rounded"

        >

          Add Item

        </Link>



      </div>






      <div className="border rounded p-4 mb-6">


        <h2 className="font-bold">

          Playlist Info

        </h2>



        <p>

          Total Duration:

          {" "}

          {playlist.totalDuration ?? 0}

          {" "}seconds

        </p>



        <p>

          Items:

          {" "}

          {playlist.items.length}

        </p>



      </div>







      <h2 className="text-xl font-bold mb-4">

        Broadcast Sequence

      </h2>





      {
        playlist.items.length === 0 ? (


          <p className="text-gray-500">

            No playlist items yet.

          </p>


        ):(


          <div className="space-y-3">


          {
            playlist.items
            .sort(
              (a,b)=>
                a.order-b.order
            )
            .map(item=>(


              <div

              key={item.id}

              className="border p-4 rounded flex justify-between"

              >


                <div>


                  <p className="font-semibold">


                    {item.order}.


                    {" "}


                    {item.type}


                  </p>



                  <p>


                    {
                      item.movie?.title ||

                      item.advertisement?.title ||

                      "Media"

                    }


                  </p>


                </div>





                <div>


                  {item.duration ?? 0}

                  {" "}sec


                </div>



              </div>


            ))
          }


          </div>


        )

      }




    </div>

  );

}