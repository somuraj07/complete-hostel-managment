import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "No student IDs provided" },
        { status: 400 }
      );
    }

    await prisma.student.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ success: true, deleted: ids });
  } catch (error) {
    console.error("Error in DELETE /api/students/delete-many:", error);
    return NextResponse.json(
      { message: "Failed to delete students" },
      { status: 500 }
    );
  }
}
