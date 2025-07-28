import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/db';

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').slice(-2, -1)[0]; 

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
    return NextResponse.json({ error: 'Student not found or update failed' }, { status: 500 });
  }
}
