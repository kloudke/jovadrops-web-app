import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductDetailsClient } from "./client-page"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { slug: id },
    include: {
      variants: true
    }
  })

  if (!product) {
    notFound()
  }

  // Convert dates to ISO strings to pass to Client Component
  const productData = {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    variants: product.variants.map(v => ({
      ...v,
      price: Number(v.price)
    }))
  }

  return <ProductDetailsClient product={productData} />
}
