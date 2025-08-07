
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newUser = await prisma.student.create({
      data: {
        name: body.name,
        registerNo: body.registerNo,
        roomNumber: body.roomNumber,
        reason: body.reason,
        village: body.village,
        phoneNumber: body.phoneNumber,
        days: body.days,
        submit: false,
        returned: false,
        photo: body.photo,
        approvedBy: null, // Initially null, can be updated later
      },
    });
   console.log("Received data:", body);
    console.log("New student created:", newUser);
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/students/new:", error);
    return NextResponse.json(
      { message: "Failed to create student" },
      { status: 500 }
    );
  }
}

//rendering all the info of studenst of information
export async function GET() {
  try {
    const students = await prisma.student.findMany();
    console.log(" Students fetched:", students.length);
    return NextResponse.json(students);
  } catch (err: any) {
    console.error(" Error fetching students:", err);
    return NextResponse.json({ message: "Failed to fetch", error: err.message }, { status: 500 });
  }
}
