import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").filter(Boolean).pop();

    if (!id) {
      return new NextResponse("Student ID is missing in the URL", { status: 400 });
    }

    const updated = await prisma.student.update({
      where: { id },
      data: {
        returned: true,
        comeinTime: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/students/[id]/return →", error);
    return new NextResponse("Error updating return status", { status: 500 });
  }
}
