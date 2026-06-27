"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function CreatePlaylistPage() {


  const router = useRouter();

  const params = useParams();


  const programId =
    Number(params.id);



  const [name, setName] =
    useState("");



  const [loading, setLoading] =
    useState(false);




  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    setLoading(true);


    try {


      const res = await fetch(
        "/api/playlists",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },


          body: JSON.stringify({

            name,

            programId,

          }),

        }
      );



      const data =
        await res.json();



      if (!res.ok) {

        throw new Error(
          data.message ||
          "Failed to create playlist"
        );

      }



      router.push(
        `/admin/programs/${programId}`
      );



    } catch (error) {


      console.error(error);


      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );


    } finally {


      setLoading(false);


    }


  }





  return (

    <div className="max-w-xl mx-auto p-6">


      <h1 className="text-2xl font-bold mb-6">

        Create Playlist

      </h1>



      <form

        onSubmit={handleSubmit}

        className="space-y-5"

      >


        <div>


          <label className="block mb-2 font-medium">

            Playlist Name

          </label>



          <input

            type="text"

            value={name}


            onChange={(e)=>
              setName(e.target.value)
            }


            placeholder="Example: Friday Movie Night"


            className="border rounded w-full p-2"


            required

          />


        </div>





        <div className="text-sm text-gray-500">


          Program ID:

          {" "}

          {programId}

        </div>

        <button

          type="submit"

          disabled={loading}


          className="bg-blue-600 text-white px-5 py-2 rounded"

        >

          {
            loading
            ? "Creating..."
            : "Create Playlist"
          }


        </button>



      </form>


    </div>

  );

}