"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


type Media = {
  id:number;
  title:string;
};


export default function CreatePlaylistItemPage(){


  const params = useParams();

  const router = useRouter();


  const playlistId =
    Number(params.id);



  const [type,setType] =
    useState("MOVIE");


  const [movies,setMovies] =
    useState<Media[]>([]);


  const [ads,setAds] =
    useState<Media[]>([]);


  const [selectedId,setSelectedId] =
    useState<number>(0);


  const [order,setOrder] =
    useState(1);




  useEffect(()=>{


    async function loadData(){


      const movieRes =
        await fetch("/api/movies");


      const movieData =
        await movieRes.json();


      setMovies(movieData);



      const adRes =
        await fetch("/api/advertisements");


      const adData =
        await adRes.json();


      setAds(adData);


    }



    loadData();


  },[]);






  const options =
    type === "MOVIE"
    ? movies
    : ads;






  async function handleSubmit(
    e:React.FormEvent
  ){


    e.preventDefault();



    await fetch(
      "/api/playlist-items",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },


        body:JSON.stringify({

          playlistId,

          type,

          order,


          movieId:
          type === "MOVIE"
          ? selectedId
          : null,


          advertisementId:
          type === "ADVERTISEMENT"
          ? selectedId
          : null


        })


      }

    );



    router.push(
      `/admin/playlists/${playlistId}`
    );


  }





  return (

    <div className="max-w-xl mx-auto p-6">


      <h1 className="text-2xl font-bold mb-6">

        Add Playlist Item

      </h1>



      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >


        <div>


          <label>
            Type
          </label>


          <select

            className="border w-full p-2"

            value={type}

            onChange={
              e=>{
                setType(e.target.value);
                setSelectedId(0);
              }
            }

          >


            <option value="MOVIE">
              Movie
            </option>


            <option value="ADVERTISEMENT">
              Advertisement
            </option>


          </select>


        </div>





        <div>


          <label>
            Select Media
          </label>


          <select

          className="border w-full p-2"


          value={selectedId}


          onChange={
            e=>
            setSelectedId(
              Number(e.target.value)
            )
          }


          >


          <option value={0}>
            Select
          </option>


          {
            options.map(item=>(

              <option

              key={item.id}

              value={item.id}

              >

                {item.title}

              </option>


            ))
          }


          </select>


        </div>





        <div>


          <label>
            Order
          </label>


          <input

          type="number"

          className="border w-full p-2"

          value={order}


          onChange={
            e=>
            setOrder(
              Number(e.target.value)
            )
          }


          />


        </div>





        <button

        className="bg-blue-600 text-white px-5 py-2 rounded"

        >

          Add Item

        </button>



      </form>


    </div>

  );

}