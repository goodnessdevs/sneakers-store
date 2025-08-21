'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from './ui/input'
import { useState } from 'react'
import { Product } from '@/payload-types'
import type { PaginatedDocs } from 'payload'

interface Props {
  products: PaginatedDocs<Product>
}

export default function ProductsList({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('')

  if (!products || !Array.isArray(products.docs)) {
    return <p className="text-center text-gray-500">No products found.</p>
  }

  const filteredProduct = products.docs.filter((product: any) => {
    const term = searchTerm.toLowerCase()
    const nameMatch = product.title?.toLowerCase().includes(term)
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false
    return nameMatch || descriptionMatch
  })

  return (
    <div>
      <div className="mt-3 space-y-2.5">
        <Input
          type="text"
          placeholder="Seach products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-[400px] mx-auto"
        />
      </div>
      <div className="p-14 md:px-20 md:py-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mx-auto">
        {filteredProduct.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products match your search.</p>
        ) : (
          filteredProduct.map((product: any) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card className="w-full h-[300px] dark:bg-slate-950 flex flex-col justify-between hover:scale-110 hover:shadow-sm hover:shadow-slate-700 transition">
                <CardHeader className="text-start">
                  <CardTitle className="text-base">{product.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex justify-center items-center md:h-[250px] h-[200px]">
                  {product?.image?.cloudinary?.secure_url ? (
                    <Image
                      src={product.image.cloudinary.secure_url}
                      alt={product.image.alt || product.title}
                      width={100}
                      height={100}
                      className="object-contain h-full w-auto rounded"
                      quality={100}
                    />
                  ) : (
                    <span className="text-gray-500">No image</span>
                  )}
                </CardContent>

                <CardFooter className="text-center text-lg font-semibold">
                  ${product.price}
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
