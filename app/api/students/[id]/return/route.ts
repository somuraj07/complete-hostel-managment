import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const studentId = url.pathname.split("/").pop(); // gets [id] from URL

    if (!studentId) {
      return new NextResponse("Missing student ID", { status: 400 });
    }

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
