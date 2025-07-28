import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const studentId = context.params.id;

    const updated = await prisma.student.update({
      where: { id: studentId },
      data: {
        returned: true,
        comeinTime: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /students/[id]/return →", error);
    return new NextResponse("Error updating return status", { status: 500 });
  }
}
