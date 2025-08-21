// import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { inclusions } from '../constants'
import Hero from '@/components/Hero'
import payload from '@/lib/payload'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const getProducts = async () => {
  const products = await payload.find({
    collection: 'products',
    sort: '-createdAt',
    limit: 5,
  })

  console.log('Successfully fetched products:', products.totalDocs)

  return { products }
}

export default async function HomePage() {
  // const headers = await getHeaders()
  // const { user } = await payload.auth({ headers })
  const { products } = await getProducts()

  return (
    <div>
      <Hero />
      <h2 className="text-3xl font-bold ms-16">Start Shopping</h2>
      <div className="p-14 md:px-20 md:py-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mx-auto">
        {products.docs.map((product: any) => (
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
                    width={250}
                    height={250}
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
        ))}
      </div>

      <div>
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-10 p-10">
          {inclusions.map((inclusion) => (
            <li key={inclusion.title}>
              <Link href={inclusion.href}>
                <Image
                  src={inclusion.icon}
                  alt={inclusion.title}
                  width={20}
                  height={20}
                  quality={100}
                  style={{
                    filter:
                      'invert(44%) sepia(9%) saturate(254%) hue-rotate(181deg) brightness(91%) contrast(87%)',
                  }}
                />
                <h3 className="text-lg font-semibold mt-1.5">{inclusion.title}</h3>
                <p>{inclusion.details}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
