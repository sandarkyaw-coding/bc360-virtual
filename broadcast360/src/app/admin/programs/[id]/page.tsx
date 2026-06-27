"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


type Program = {

  id:number;

  title:string;

  type:string;

  description:string | null;

  createdAt:string;


  channel:{
    id:number;
    name:string;
  };


  playlists:{
    id:number;
    name:string;
    totalDuration:number | null;
  }[];

};



export default function ProgramDetailsPage(){


  const params = useParams();

  const id = params.id as string;


  const [program,setProgram] =
    useState<Program | null>(null);



  useEffect(()=>{


    async function loadProgram(){


      try{


        const res =
          await fetch(
            `/api/programs/${id}`
          );


        const data =
          await res.json();


        setProgram(data);



      }catch(error){

        console.error(error);

      }


    }



    loadProgram();



  },[id]);





  if(!program){


    return (

      <div className="p-6">

        Loading...

      </div>

    );

  }






  return (

    <div className="max-w-4xl mx-auto p-6">


      <div className="flex justify-between mb-6">


        <h1 className="text-3xl font-bold">

          {program.title}

        </h1>



        <Link

          href={`/admin/programs/${program.id}/edit`}

          className="bg-green-600 text-white px-4 py-2 rounded"

        >

          Edit

        </Link>



      </div>





      <div className="border rounded p-5 space-y-3">


        <p>

          <b>Channel:</b>{" "}

          {program.channel.name}

        </p>



        <p>

          <b>Type:</b>{" "}

          {program.type}

        </p>




        <p>

          <b>Description:</b>{" "}

          {program.description || "No description"}

        </p>



        <p>

          <b>Created:</b>{" "}

          {
            new Date(
              program.createdAt
            ).toLocaleString()
          }

        </p>


      </div>





      <div className="mt-8">


        <div className="flex justify-between mb-4">


          <h2 className="text-xl font-bold">

            Playlists

          </h2>



          <Link

          href={`/admin/programs/${program.id}/playlists/create`}

          className="bg-blue-600 text-white px-4 py-2 rounded"

          >

          Create Playlist

          </Link>


        </div>





        {program.playlists.length === 0 ? (


          <p className="text-gray-500">

            No playlist created yet.

          </p>


        ):(


          <div className="space-y-3">


            {program.playlists.map(
              (playlist)=>(


              <div

                key={playlist.id}

                className="border p-4 rounded"

              >


                <h3 className="font-semibold">

                  {playlist.name}

                </h3>


                <p>

                  Duration:

                  {" "}

                  {playlist.totalDuration ?? 0}

                  {" "}seconds

                </p>


              </div>


            ))}



          </div>


        )}



      </div>


    </div>

  );

}