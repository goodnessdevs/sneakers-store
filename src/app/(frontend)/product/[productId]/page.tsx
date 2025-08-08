import payload from '@/lib/payload'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type ProductPageProps = {
  params: {
    productId: string
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params

  try {
    const product = await payload.findByID({
      collection: 'products',
      id: productId,
    })

    if (!product) return notFound()

    return (
      <div className="p-10 py-24 grid md:grid-cols-2 gap-8">
        <div className="w-full h-[400px] flex justify-center items-center bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
          <Image
            src={
              typeof product.images === 'string'
                ? product.images
                : (product.images?.url ?? '/cover.png')
            }
            alt={product.title}
            width={500}
            height={500}
            className="object-contain h-full w-auto"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">${product.price}</p>

          <div className="mt-4">
            <p className="text-gray-800 dark:text-gray-200">
              {product.description || 'No description available.'}
            </p>
          </div>

          {/* Add to Cart Button Placeholder */}
          <button className="mt-6 px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-semibold rounded">
            Add to Cart
          </button>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return notFound()
  }
}

export default ProductPage
