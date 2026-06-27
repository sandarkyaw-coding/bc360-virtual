import { NextRequest, NextResponse } from "next/server";
import { ProgramService } from "@/services/program.service";

const service = new ProgramService();

// GET /api/programs
export async function GET() {
  try {
    const programs = await service.getPrograms();

    return NextResponse.json(programs);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch programs." },
      { status: 500 }
    );
  }
}

// POST /api/programs
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const program = await service.createProgram(body);

    return NextResponse.json(program, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to create program.",
      },
      {
        status: 400,
      }
    );
  }
}