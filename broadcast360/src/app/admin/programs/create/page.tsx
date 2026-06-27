"use client";

import { useRouter } from "next/navigation";
import ProgramForm from "@/components/admin/programs/programForm";
import { ProgramFormData } from "@/types/program";

export default function CreateProgramPage() {

  const router = useRouter();


  async function handleSubmit(data: ProgramFormData) {

    try {

      const res = await fetch("/api/programs", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),

      });


      const result = await res.json();


      if (!res.ok) {

        throw new Error(
          result.message || "Failed to create program"
        );

      }


      router.push("/admin/programs");


    } catch (error) {

      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );

    }

  }


  return (

    <div className="max-w-3xl mx-auto p-6">


      <h1 className="text-2xl font-bold mb-6">
        Create Program
      </h1>


      <ProgramForm
        onSubmit={handleSubmit}
      />


    </div>

  );

}