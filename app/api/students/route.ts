import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newUser = await prisma.student.create({
      data: {
        name: body.name,
        registerNo: body.registerNo,
        roomNumber: body.roomNumber,
        reason: body.reason,
        village: body.village,
        phoneNumber: body.phoneNumber,
        days: body.days,
        approvedBy: "Warden",
        submit: body.submit,
        returned: body.returned
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
//rendering all the info of studenst of information
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(students);
  } catch (err: any) {
    return NextResponse.json({ message: "Failed to fetch", error: err.message }, { status: 500 });
  }
}