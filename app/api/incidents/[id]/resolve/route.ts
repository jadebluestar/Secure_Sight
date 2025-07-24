import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    // ✅ Extract ID from URL path
    const pathname = request.nextUrl.pathname; // e.g. /api/incidents/123
    const id = pathname.split('/').pop(); // "123"

    if (!id) {
      return NextResponse.json({ error: 'Missing incident ID' }, { status: 400 });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: { camera: true },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error('Error resolving incident:', error);
    return NextResponse.json({ error: 'Failed to resolve incident' }, { status: 500 });
  }
}
