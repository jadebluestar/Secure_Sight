import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Fix: Await params for Next.js App Router
    const { id } = await context.params;

    console.log('Updating Incident:', id);

    // ✅ Update the incident
    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: { camera: true },
    });

    console.log('Updated Data:', updatedIncident);

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error('Error resolving incident:', error);
    return NextResponse.json(
      { error: 'Failed to resolve incident' },
      { status: 500 }
    );
  }
}
