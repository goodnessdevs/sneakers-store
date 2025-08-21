// import payload from '@/lib/payload'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import Link from 'next/link'
// import Image from 'next/image'

// export const getProducts = async () => {
//   const products = await payload.find({
//     collection: 'products',
//     sort: ' desc',
//   })

//   console.log('Successfully fetched products:')

//   return { products }
// }

// const ProductsList = async () => {
//   const { products } = await getProducts()

//   return (
//     <div className="p-14 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
//       {products.docs.map((product) => (
//         <Link href={`/product/${product.id}`} key={product.id}>
//           <Card className="w-full h-[300px] dark:bg-slate-950 flex flex-col justify-between hover:scale-110 hover:shadow-sm hover:shadow-slate-700 transition">
//             <CardHeader className="text-start">
//               <CardTitle className="text-base">{product.title}</CardTitle>
//             </CardHeader>

//             <CardContent className="flex justify-center items-center md:h-[250px] h-[200px]">
//               <Image
//                 src={
//                   typeof product.images === 'string'
//                     ? product.images
//                     : typeof product.images === 'object' && product.images?.url
//                       ? product.images.url
//                       : '/cover.png'
//                 }
//                 alt="product image"
//                 width={250}
//                 height={250}
//                 className="object-contain h-full w-auto rounded"
//                 quality={100}
//               />
//             </CardContent>

//             <CardFooter className="text-center text-lg font-semibold">${product.price}</CardFooter>
//           </Card>
//         </Link>
//       ))}
//     </div>
//   )
// }

// export default ProductsList

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

type Product = {
  id: string
  title: string
  images: any
  price: number
  createdAt: string
}

const ProductsList = ({ sortOrder }: { sortOrder: 'latest' | 'oldest' }) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/my-route/products?sort=${sortOrder}`, {
          method: 'GET',
        })
        const data = await res.json()
        console.log('Fetched data:', data)

        if (data.products?.docs) {
          setProducts(data.products.docs)
        } else {
          console.warn('No products found in response')
          setProducts([])
        }
      } catch (err) {
        console.error('Error loading products:', err)
      }
    }

    fetchProducts()
  }, [sortOrder])

  return (
    <div className="p-14 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <Card className="w-full h-[300px] dark:bg-slate-950 flex flex-col justify-between hover:scale-110 hover:shadow-sm hover:shadow-slate-700 transition">
            <CardHeader className="text-start">
              <CardTitle className="text-base">{product.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center items-center md:h-[250px] h-[200px]">
              <Image
                src={
                  typeof product.images === 'string'
                    ? product.images
                    : typeof product.images === 'object' && product.images?.url
                      ? product.images.url
                      : '/cover.png'
                }
                alt={product.images.alt}
                width={250}
                height={250}
                className="object-contain h-full w-auto rounded"
                quality={100}
              />
            </CardContent>

            <CardFooter className="text-center text-lg font-semibold">${product.price}</CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default ProductsList
