import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.incident.deleteMany()
  await prisma.camera.deleteMany()

  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Camera A',
        location: 'Shop Floor A',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera B',
        location: 'Vault',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera C',
        location: 'Entrance',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera D',
        location: 'Storage Room',
      },
    }),
  ])

  // Create incidents with timestamps in the last 24 hours
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const incidents = [
    {
      type: 'Unauthorized Access',
      tsStart: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      tsEnd: new Date(now.getTime() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000), // 5 minutes duration
      thumbnailUrl: '/thumbnails/thumb1.jpg',
      resolved: false,
      cameraId: cameras[0].id,
    },
    {
      type: 'Gun Threat',
      tsStart: new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
      tsEnd: new Date(now.getTime() - 3 * 60 * 60 * 1000 + 2 * 60 * 1000), // 2 minutes duration
      thumbnailUrl: '/thumbnails/thumb2.jpg',
      resolved: false,
      cameraId: cameras[1].id,
    },
    {
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      tsEnd: new Date(now.getTime() - 4 * 60 * 60 * 1000 + 1 * 60 * 1000), // 1 minute duration
      thumbnailUrl: '/thumbnails/thumb3.jpg',
      resolved: false,
      cameraId: cameras[2].id,
    },
    {
      type: 'Unauthorized Access',
      tsStart: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
      tsEnd: new Date(now.getTime() - 5 * 60 * 60 * 1000 + 3 * 60 * 1000), // 3 minutes duration
      thumbnailUrl: '/thumbnails/thumb1.jpg',
      resolved: false,
      cameraId: cameras[3].id,
    },
    {
      type: 'Traffic Congestion',
      tsStart: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
      tsEnd: new Date(now.getTime() - 6 * 60 * 60 * 1000 + 10 * 60 * 1000), // 10 minutes duration
      thumbnailUrl: '/thumbnails/thumb2.jpg',
      resolved: false,
      cameraId: cameras[0].id,
    },
    {
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 7 * 60 * 60 * 1000), // 7 hours ago
      tsEnd: new Date(now.getTime() - 7 * 60 * 60 * 1000 + 1 * 60 * 1000), // 1 minute duration
      thumbnailUrl: '/thumbnails/thumb3.jpg',
      resolved: false,
      cameraId: cameras[1].id,
    },
    {
      type: 'Gun Threat',
      tsStart: new Date(now.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
      tsEnd: new Date(now.getTime() - 8 * 60 * 60 * 1000 + 4 * 60 * 1000), // 4 minutes duration
      thumbnailUrl: '/thumbnails/thumb1.jpg',
      resolved: false,
      cameraId: cameras[2].id,
    },
    {
      type: 'Unauthorized Access',
      tsStart: new Date(now.getTime() - 10 * 60 * 60 * 1000), // 10 hours ago
      tsEnd: new Date(now.getTime() - 10 * 60 * 60 * 1000 + 7 * 60 * 1000), // 7 minutes duration
      thumbnailUrl: '/thumbnails/thumb2.jpg',
      resolved: false,
      cameraId: cameras[3].id,
    },
    {
      type: 'Multiple Events',
      tsStart: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
      tsEnd: new Date(now.getTime() - 12 * 60 * 60 * 1000 + 15 * 60 * 1000), // 15 minutes duration
      thumbnailUrl: '/thumbnails/thumb3.jpg',
      resolved: false,
      cameraId: cameras[0].id,
    },
    {
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 14 * 60 * 60 * 1000), // 14 hours ago
      tsEnd: new Date(now.getTime() - 14 * 60 * 60 * 1000 + 2 * 60 * 1000), // 2 minutes duration
      thumbnailUrl: '/thumbnails/thumb1.jpg',
      resolved: false,
      cameraId: cameras[1].id,
    },
    {
      type: 'Traffic Congestion',
      tsStart: new Date(now.getTime() - 16 * 60 * 60 * 1000), // 16 hours ago
      tsEnd: new Date(now.getTime() - 16 * 60 * 60 * 1000 + 12 * 60 * 1000), // 12 minutes duration
      thumbnailUrl: '/thumbnails/thumb2.jpg',
      resolved: false,
      cameraId: cameras[2].id,
    },
    {
      type: 'Unauthorized Access',
      tsStart: new Date(now.getTime() - 18 * 60 * 60 * 1000), // 18 hours ago
      tsEnd: new Date(now.getTime() - 18 * 60 * 60 * 1000 + 6 * 60 * 1000), // 6 minutes duration
      thumbnailUrl: '/thumbnails/thumb3.jpg',
      resolved: false,
      cameraId: cameras[3].id,
    },
    {
      type: 'Gun Threat',
      tsStart: new Date(now.getTime() - 20 * 60 * 60 * 1000), // 20 hours ago
      tsEnd: new Date(now.getTime() - 20 * 60 * 60 * 1000 + 3 * 60 * 1000), // 3 minutes duration
      thumbnailUrl: '/thumbnails/thumb1.jpg',
      resolved: false,
      cameraId: cameras[0].id,
    },
    {
      type: 'Multiple Events',
      tsStart: new Date(now.getTime() - 22 * 60 * 60 * 1000), // 22 hours ago
      tsEnd: new Date(now.getTime() - 22 * 60 * 60 * 1000 + 8 * 60 * 1000), // 8 minutes duration
      thumbnailUrl: '/thumbnails/thumb2.jpg',
      resolved: false,
      cameraId: cameras[1].id,
    },
    {
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 23 * 60 * 60 * 1000), // 23 hours ago
      tsEnd: new Date(now.getTime() - 23 * 60 * 60 * 1000 + 1 * 60 * 1000), // 1 minute duration
      thumbnailUrl: '/thumbnails/thumb3.jpg',
      resolved: false,
      cameraId: cameras[2].id,
    },
  ]

  await Promise.all(
    incidents.map((incident) =>
      prisma.incident.create({
        data: incident,
      })
    )
  )

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })