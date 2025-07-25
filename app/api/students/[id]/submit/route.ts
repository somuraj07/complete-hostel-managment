import { NextResponse } from "next/server";
import {prisma} from "@/lib/db"; 
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const student = await prisma.student.update({
      where: { id },
      data: { submit: true },
    });

    return NextResponse.json(student);
  } catch (error) {
    return new NextResponse("Error updating submit status", { status: 500 });
  }
}
