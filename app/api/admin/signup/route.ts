import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";




export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { person , username, password,role } = body;
        if (!person || !username || !password || !role) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }
        const existing = await prisma.admin.findUnique({
            where: { username }
        }); 
        if (existing) {
            return NextResponse.json(
                { error: "Username already exists" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.admin.create({
            data:{
                person,
                username,
                password: hashedPassword,
                role,
            }
        });
        return NextResponse.json(
            { message: "Admin created successfully", user },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: "An error occurred while processing your request in admin signup.",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}