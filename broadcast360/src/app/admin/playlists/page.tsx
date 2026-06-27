"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


type Playlist = {

  id:number;

  name:string;

  totalDuration:number | null;

  createdAt:string;

};



export default function PlaylistListPage(){


  const params = useParams();


  const programId =
    Number(params.id);



  const [playlists,setPlaylists] =
    useState<Playlist[]>([]);


  const [loading,setLoading] =
    useState(true);




  useEffect(()=>{


    async function loadPlaylists(){


      try{


        const res =
          await fetch(
            `/api/playlists?programId=${programId}`
          );



        const data =
          await res.json();



        setPlaylists(data);



      }catch(error){

        console.error(error);

      }
      finally{

        setLoading(false);

      }


    }



    loadPlaylists();


  },[programId]);






  if(loading){


    return (

      <div className="p-6">

        Loading playlists...

      </div>

    );

  }







  return (

    <div className="p-6 max-w-5xl mx-auto">


      <div className="flex justify-between mb-6">


        <h1 className="text-2xl font-bold">

          Playlists

        </h1>



        <Link

          href={`/admin/programs/${programId}/playlists/create`}


          className="bg-blue-600 text-white px-4 py-2 rounded"

        >

          Create Playlist

        </Link>


      </div>





      <table className="w-full border">


        <thead>


          <tr className="border">


            <th className="p-3 text-left">

              Name

            </th>



            <th className="p-3 text-left">

              Duration

            </th>



            <th className="p-3 text-left">

              Created

            </th>



            <th className="p-3">

              Actions

            </th>


          </tr>


        </thead>





        <tbody>


        {
          playlists.map((playlist)=>(


            <tr

              key={playlist.id}

              className="border"

            >


              <td className="p-3">

                {playlist.name}

              </td>




              <td className="p-3">


                {
                  playlist.totalDuration
                  ??
                  0
                }

                {" "}seconds


              </td>





              <td className="p-3">


                {
                  new Date(
                    playlist.createdAt
                  ).toLocaleDateString()
                }


              </td>





              <td className="p-3 flex gap-3">


                <Link


                  href={`/admin/playlists/${playlist.id}`}


                  className="text-blue-600"

                >

                  View

                </Link>





                <button

                  className="text-red-600"

                >

                  Delete

                </button>


              </td>



            </tr>


          ))

        }



        </tbody>


      </table>





      {
        playlists.length === 0 && (

          <p className="text-gray-500 mt-5">

            No playlists created.

          </p>

        )

      }



    </div>

  );

}