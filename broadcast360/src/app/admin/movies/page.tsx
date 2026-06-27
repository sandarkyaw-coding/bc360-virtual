"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  duration: number;
  releaseYear: number | null;
};

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  async function handleDelete(id:number){

    const confirmDelete =
    confirm(
    "Delete this movie?"
    );

    if(!confirmDelete)
    return;

    const res =
    await fetch(
    `/api/movies/${id}`,
    {

    method:"DELETE"

    }

    );



    if(res.ok){

    setMovies(
    movies.filter(
    (movie)=>movie.id !== id
    )
    );

    }


    }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Movies
        </h1>

        <Link
          href="/admin/movies/create"
          className="bg-[#106EE9] px-5 py-3 rounded-xl"
        >
          + Add Movie
        </Link>
      </div>

      <div className="bg-[#0B1026] rounded-2xl border border-white/10 overflow-hidden">

        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="p-5 text-left">Title</th>
              <th className="p-5 text-left">Year</th>
              <th className="p-5 text-left">Duration</th>
              <th className="p-5 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => (
              <tr
                key={movie.id}
                className="border-b border-white/10"
              >
                <td className="p-5">{movie.title}</td>

                <td className="p-5">
                  {movie.releaseYear ?? "-"}
                  
                </td>

                <td className="p-5">
                  {movie.duration}
                </td>

                <td className="p-5 flex gap-3">
                  <Link

                    href={`/admin/movies/edit/${movie.id}`}

                    className="
                    bg-[#400FD3]
                    px-4
                    py-2
                    rounded-lg
                    "

                    >

                    Edit

                    </Link>

                  <button

                    onClick={()=>handleDelete(movie.id)}

                    className="
                    bg-[#F41010]
                    px-4
                    py-2
                    rounded-lg
                    "

                    >

                    Delete

                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}