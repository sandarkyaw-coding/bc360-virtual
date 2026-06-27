"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Program = {
  id: number;
  title: string;
  type: string;
  description: string | null;

  channel: {
    id: number;
    name: string;
  };

  createdAt: string;
};


export default function ProgramListPage() {


  const [programs, setPrograms] = useState<Program[]>([]);

  const [loading, setLoading] = useState(true);



  async function fetchPrograms() {

    try {

      const res = await fetch("/api/programs");

      const data = await res.json();

      setPrograms(data);


    } catch(error){

      console.error(error);

    }
    finally{

      setLoading(false);

    }

  }



  useEffect(() => {

    async function loadPrograms() {

      try {

        const res = await fetch("/api/programs");

        const data = await res.json();

        setPrograms(data);


      } catch(error) {

        console.error(error);


      } finally {

        setLoading(false);

      }

    }


    loadPrograms();


  }, []);




 async function handleDelete(id:number){

  const confirmDelete =
    confirm("Delete this program?");


  if(!confirmDelete) return;


  try {

    await fetch(`/api/programs/${id}`, {

      method:"DELETE"

    });


    window.location.reload();


  } catch(error){

    console.error(error);

  }

}





  if(loading){

    return (

      <div className="p-6">

        Loading programs...

      </div>

    );

  }




  return (

    <div className="p-6">


      <div className="flex justify-between mb-6">


        <h1 className="text-2xl font-bold">

          Programs

        </h1>



        <Link

          href="/admin/programs/create"

          className="bg-blue-600 text-white px-4 py-2 rounded"

        >

          Create Program

        </Link>



      </div>





      <table className="w-full border">


        <thead>

          <tr className="border">


            <th className="p-3 text-left">
              Title
            </th>


            <th className="p-3 text-left">
              Type
            </th>


            <th className="p-3 text-left">
              Channel
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


        {programs.map((program)=>(


          <tr
            key={program.id}
            className="border"
          >


            <td className="p-3">

              {program.title}

            </td>



            <td className="p-3">

              {program.type}

            </td>




            <td className="p-3">

              {program.channel.name}

            </td>




            <td className="p-3">

              {
                new Date(
                  program.createdAt
                ).toLocaleDateString()
              }

            </td>




            <td className="p-3 flex gap-3">


              <Link

                href={`/admin/programs/${program.id}`}

                className="text-blue-600"

              >

                View

              </Link>



              <Link

                href={`/admin/programs/${program.id}/edit`}

                className="text-green-600"

              >

                Edit

              </Link>




              <button

                onClick={()=>
                  handleDelete(program.id)
                }

                className="text-red-600"

              >

                Delete

              </button>



            </td>


          </tr>


        ))}



        </tbody>


      </table>


    </div>

  );

}