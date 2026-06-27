import { ProgramRepository } from "@/repositories/program.repository";
import { ProgramFormData } from "@/types/program";

export class ProgramService {
  private repository = new ProgramRepository();

  async getPrograms() {
    return this.repository.findAll();
  }

  async getProgram(id: number) {
    const program = await this.repository.findById(id);

    if (!program) {
      throw new Error("Program not found.");
    }

    return program;
  }

  async getChannels() {
    return this.repository.getChannels();
  }

  async createProgram(data: ProgramFormData) {
    if (!data.title.trim()) {
      throw new Error("Program title is required.");
    }

    const exists = await this.repository.findByTitle(data.title);

    if (exists) {
      throw new Error("Program already exists.");
    }

    return this.repository.create(data);
  }

  async updateProgram(id: number, data: ProgramFormData) {
    return this.repository.update(id, data);
  }

  async deleteProgram(id: number) {
    return this.repository.delete(id);
  }
}