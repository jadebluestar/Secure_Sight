import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  // Create cameras
  const cameras = await prisma.camera.createMany({
    data: [
      { name: 'Camera A', location: 'Shop Floor A' },
      { name: 'Camera B', location: 'Vault' },
      { name: 'Camera C', location: 'Entrance' },
      { name: 'Camera D', location: 'Storage Room' }
    ]
  });

  const cameraRecords = await prisma.camera.findMany();
  console.log(`✅ Created ${cameraRecords.length} cameras`);

  // Create incidents
  const now = new Date();

  const incidentsData = [
    {
      type: 'Unauthorized Access',
      tsStart: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      tsEnd: new Date(now.getTime() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
      thumbnailUrl: '/thumbnails/thumb1.jpg',
      resolved: false,
      cameraId: cameraRecords[0].id
    },
    {
      type: 'Gun Threat',
      tsStart: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      tsEnd: new Date(now.getTime() - 3 * 60 * 60 * 1000 + 2 * 60 * 1000),
      thumbnailUrl: '/thumbnails/thumb2.jpg',
      resolved: false,
      cameraId: cameraRecords[1].id
    },
    {
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      tsEnd: new Date(now.getTime() - 4 * 60 * 60 * 1000 + 1 * 60 * 1000),
      thumbnailUrl: '/thumbnails/thumb3.jpg',
      resolved: false,
      cameraId: cameraRecords[2].id
    }
  ];

  await prisma.incident.createMany({ data: incidentsData });

  console.log('✅ Inserted incidents successfully');
}

main()
  .then(() => {
    console.log('🌱 Seeding completed!');
  })
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
