import { NextRequest, NextResponse } from "next/server";
import { ProgramService } from "@/services/program.service";

const service = new ProgramService();

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/programs/:id
export async function GET(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const program = await service.getProgram(Number(id));

    return NextResponse.json(program);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Program not found.",
      },
      {
        status: 404,
      }
    );
  }
}

// PUT /api/programs/:id
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await req.json();

    const program = await service.updateProgram(Number(id), body);

    return NextResponse.json(program);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to update program.",
      },
      {
        status: 400,
      }
    );
  }
}

// DELETE /api/programs/:id
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await service.deleteProgram(Number(id));

    return NextResponse.json({
      message: "Program deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete program.",
      },
      {
        status: 400,
      }
    );
  }
}