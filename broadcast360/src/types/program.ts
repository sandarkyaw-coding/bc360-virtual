export type ProgramType =
  | "MOVIE"
  | "SERIES"
  | "NEWS"
  | "LIVE"
  | "ENTERTAINMENT";

export interface ProgramFormData {
  title: string;
  description?: string;
  type: ProgramType;
  channelId: number;
}

export interface Program {
  id: number;
  title: string;
  description: string | null;
  type: ProgramType;

  channelId: number;

  createdAt: string;

  channel: {
    id: number;
    name: string;
  };
}