import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } } 
) {
  const { id } = params;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        returned: true,
        comeinTime: new Date().toISOString(),
      },
    });

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH /api/students/[id]/return:', error);
    return NextResponse.json(
      { error: 'Student not found or update failed' },
      { status: 500 }
    );
  }
}