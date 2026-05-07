import { prisma } from "@/lib/prisma"
import { ProductsClientPage } from "./client-page"

export default async function ProductsPage() {
  const dbProducts = await prisma.product.findMany({
    include: {
      variants: true,
    }
  })

  // Format the products to match what the client expects
  const products = dbProducts.map(p => {
    // Find the cheapest variant or default to 0
    const cheapestPrice = p.variants.length > 0 
      ? Math.min(...p.variants.map(v => Number(v.price)))
      : 0

    const formattedPrice = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(cheapestPrice).replace('KES', 'KSH')

    // For now, we'll try to guess a category or just say "All Products"
    let category = "All Products"
    if (p.name.includes("20L")) category = "20L Litres"
    else if (p.name.includes("10L")) category = "10L Litres"
    else if (p.name.includes("5L")) category = "5L Litres"
    else if (p.name.includes("Stanley")) category = "Stanley Cups"

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: formattedPrice,
      category,
      image: p.image
    }
  })

  return <ProductsClientPage products={products} />
}
