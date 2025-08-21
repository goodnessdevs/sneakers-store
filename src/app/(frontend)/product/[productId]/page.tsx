import payload from '@/lib/payload'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartSection from '@/components/AddToCartSection'

interface Product {
  id: string
  title: string
  price: number
  description?: string
  image?: {
    url?: string
    alt?: string
    cloudinary?: {
      secure_url?: string
    }
  }
}

interface ProductPageProps {
  params: Promise<{ productId: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params

  try {
    const product = (await payload.findByID({
      collection: 'products',
      id: productId,
    })) as Product

    if (!product) return notFound()
    const imageUrl = product?.image?.cloudinary?.secure_url

    return (
      <div className="p-10 py-24 grid md:grid-cols-2 gap-12 bg-gradient-to-br from-rose-100 via-white to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Product Image */}
        <div className="w-full h-[450px] flex justify-center items-center bg-white dark:bg-slate-900 rounded-2xl shadow-md overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.image?.alt || product.title}
              width={600}
              height={600}
              className="object-contain h-full w-auto transition-transform hover:scale-105"
              priority
            />
          ) : (
            <span className="text-gray-500">No image</span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold tracking-tight">{product.title}</h1>
          <p className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
            ${product.price}
          </p>

          <div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description || 'No description available.'}
            </p>
          </div>

          {/* Quantity + Add to Cart */}
          <AddToCartSection productId={product.id} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return notFound()
  }
}

export default ProductPage
