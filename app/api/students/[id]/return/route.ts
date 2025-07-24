import { NextResponse } from "next/server";
import {prisma} from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const studentId = params.id;

    const updated = await prisma.student.update({
      where: { id: studentId },
      data: {
        returned: true,
        comeinTime: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return new NextResponse("Error updating return status", { status: 500 });
  }
}
