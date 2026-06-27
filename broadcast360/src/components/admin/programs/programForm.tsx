"use client";

import { useEffect, useState } from "react";
import { ProgramFormData, ProgramType } from "@/types/program";

type Channel = {
  id: number;
  name: string;
};

type ProgramFormProps = {
  initialData?: ProgramFormData;
  onSubmit: (data: ProgramFormData) => Promise<void>;
};

const PROGRAM_TYPES: ProgramType[] = [
  "MOVIE",
  "SERIES",
  "NEWS",
  "LIVE",
  "ENTERTAINMENT",
];

export default function ProgramForm({
  initialData,
  onSubmit,
}: ProgramFormProps) {
  const [channels, setChannels] = useState<Channel[]>([]);

  const [form, setForm] = useState<ProgramFormData>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    type: initialData?.type ?? "MOVIE",
    channelId: initialData?.channelId ?? 0,
  });

  const [loading, setLoading] = useState(false);

  async function loadChannels() {
    try {
      const res = await fetch("/api/channels");

      const data = await res.json();

      setChannels(data);

      if (!form.channelId && data.length > 0) {
        setForm((prev) => ({
          ...prev,
          channelId: data[0].id,
        }));
      }

    } catch (err) {
      console.error(err);
    }
  }


    useEffect(() => {

    async function fetchChannels(){

      const res = await fetch("/api/channels");

      const data = await res.json();

      setChannels(data);


      if(data.length > 0){

        setForm((prev)=>({

          ...prev,

          channelId:
            prev.channelId || data[0].id

        }));

      }

    }
    fetchChannels();

  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "channelId"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Program Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Channel
        </label>

        <select
          name="channelId"
          value={form.channelId}
          onChange={handleChange}
          className="w-full rounded border p-2"
        >
          {channels.map((channel) => (
            <option
              key={channel.id}
              value={channel.id}
            >
              {channel.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Program Type
        </label>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full rounded border p-2"
        >
          {PROGRAM_TYPES.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-blue-600 px-5 py-2 text-white"
      >
        {loading ? "Saving..." : "Save Program"}
      </button>
    </form>
  );
}