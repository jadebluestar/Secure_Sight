import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get('resolved');

    const where = resolved === 'false' ? { resolved: false } : {};

    const incidents = await prisma.incident.findMany({
      where,
      include: { camera: true },
      orderBy: { tsStart: 'desc' },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    );
  }
}
