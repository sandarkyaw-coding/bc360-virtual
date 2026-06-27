"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProgramForm from "@/components/admin/programs/programForm";
import { ProgramFormData } from "@/types/program";


export default function EditProgramPage() {


  const router = useRouter();

  const params = useParams();

  const id = params.id as string;



  const [program, setProgram] =
    useState<ProgramFormData | null>(null);



  useEffect(() => {


    async function loadProgram(){


      try {


        const res =
          await fetch(`/api/programs/${id}`);


        const data =
          await res.json();



        setProgram({

          title:data.title,

          description:data.description ?? "",

          type:data.type,

          channelId:data.channelId

        });



      } catch(error){

        console.error(error);

      }


    }


    loadProgram();


  },[id]);





  async function handleSubmit(
    data:ProgramFormData
  ){


    try{


      const res =
        await fetch(
          `/api/programs/${id}`,
          {

            method:"PUT",

            headers:{
              "Content-Type":"application/json"
            },


            body:JSON.stringify(data)

          }
        );



      const result =
        await res.json();



      if(!res.ok){

        throw new Error(
          result.message ||
          "Update failed"
        );

      }



      router.push(
        "/admin/programs"
      );



    }catch(error){


      console.error(error);


      alert(
        error instanceof Error
        ? error.message
        : "Something went wrong"
      );


    }


  }





  if(!program){

    return (

      <div className="p-6">

        Loading...

      </div>

    );

  }





  return (

    <div className="max-w-3xl mx-auto p-6">


      <h1 className="text-2xl font-bold mb-6">

        Edit Program

      </h1>



      <ProgramForm

        initialData={program}

        onSubmit={handleSubmit}

      />


    </div>

  );


}