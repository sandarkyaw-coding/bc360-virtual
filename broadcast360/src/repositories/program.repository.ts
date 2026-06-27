import {prisma} from "@/lib/prisma";
import { ProgramFormData } from "@/types/program";

export class ProgramRepository {
  async findAll() {
    return prisma.program.findMany({
      include: {
        channel: true,
        playlists: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.program.findUnique({
      where: {
        id,
      },
      include: {
        channel: true,
        playlists: true,
      },
    });
  }

  async findByTitle(title: string) {
    return prisma.program.findFirst({
      where: {
        title,
      },
    });
  }

  async create(data: ProgramFormData) {
    return prisma.program.create({
      data,
    });
  }

  async update(id: number, data: ProgramFormData) {
    return prisma.program.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.program.delete({
      where: {
        id,
      },
    });
  }

  async getChannels() {
    return prisma.channel.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}