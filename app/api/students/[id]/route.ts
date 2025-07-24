import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// PUT – Only updates `submit`
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updated = await prisma.student.update({
      where: { id },
      data: {
        submit: body.submit,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: "PUT error", error: err.message }, { status: 500 });
  }
}

// PATCH – For updating comeoutTime, comeinTime, returned etc.
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updated = await prisma.student.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: "PATCH error", error: err.message }, { status: 500 });
  }
}
