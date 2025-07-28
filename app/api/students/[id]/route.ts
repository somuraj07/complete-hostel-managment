import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// PUT – Only updates `submit` value
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extract ID from the URL

    if (!id) {
      return NextResponse.json({ message: "ID not found in URL" }, { status: 400 });
    }

    const body = await request.json();

    const updated = await prisma.student.update({
      where: { id },
      data: {
        submit: body.submit,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json(
      { message: "PUT error", error: err.message },
      { status: 500 }
    );
  }
}

// PATCH – Updates comeoutTime, comeinTime, and returned
export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extract ID from the URL

    if (!id) {
      return NextResponse.json({ message: "ID not found in URL" }, { status: 400 });
    }

    const body = await request.json();
    const { comeoutTime, comeinTime, returned } = body;

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...(comeoutTime && { comeoutTime: new Date(comeoutTime) }),
        ...(comeinTime && { comeinTime: new Date(comeinTime) }),
        ...(returned !== undefined && { returned }),
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (error: any) {
    return NextResponse.json(
      { message: "PATCH error", error: error.message },
      { status: 500 }
    );
  }
}
