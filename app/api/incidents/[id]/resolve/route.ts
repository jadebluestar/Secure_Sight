// app/api/incidents/[id]/resolve/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split("/").at(-2); // Extract ID from URL

    if (!id) {
      return NextResponse.json({ error: "Missing incident ID" }, { status: 400 });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error("Error resolving incident:", error);
    return NextResponse.json(
      { error: "Failed to resolve incident" },
      { status: 500 }
    );
  }
}
