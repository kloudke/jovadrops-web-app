/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Check if products already exist to make seed idempotent
  const count = await prisma.product.count()
  if (count > 0) {
    console.log('Database already contains products. Skipping seeding.')
    return
  }

  const product = await prisma.product.create({
    data: {
      name: '20L Water Bottle',
      slug: '20l-bottle',
      description: 'Our 20L bottle is perfect for families and offices. Made from high-quality, BPA-free material.',
      image: '/20-liter-bottle.png',
      features: [
        'Capacity: 20 Litres',
        'BPA-free & Food Grade',
        'Durable & Reusable',
        'Multi-stage purified water'
      ],
      variants: {
        create: [
          {
            type: 'bottle',
            name: '20L Empty Bottle',
            price: 800,
            description: 'A durable, reusable 20L empty bottle. Perfect for storing water. Made from high-quality, BPA-free food-grade plastic.',
            features: [
              'Capacity: 20 Litres',
              'BPA-free & Food Grade',
              'Durable & Reusable',
              'Fits standard dispensers'
            ]
          },
          {
            type: 'water',
            name: '20L Water Refill',
            price: 400,
            description: 'Refill your existing 20L bottle with our clean, safe, and refreshing purified water. Pure hydration at an affordable price.',
            features: [
              'Capacity: 20 Litres',
              'Multi-stage purified water',
              'Clean & refreshing taste',
              'Eco-friendly refill'
            ]
          },
          {
            type: 'package',
            name: '20L Water + Bottle',
            price: 1200,
            description: 'The complete 20L hydration package. Get a high-quality, reusable bottle filled with our multi-stage purified water.',
            features: [
              '20 Litres of pure water',
              'New durable, BPA-free bottle',
              'Multi-stage purified',
              'Ready to drink'
            ]
          }
        ]
      }
    }
  })

  console.log('Seeded product:', product.slug)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })