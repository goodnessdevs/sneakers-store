import { cookies } from 'next/headers'
import ProductsList from '@/components/product-list'
import AuthDialog from '@/components/auth-dialog'
import payload from '@/lib/payload'

const getProducts = async () => {
  const products = await payload.find({
    collection: 'products',
    sort: 'desc', // ✅ newest first
  })

  console.log('Successfully fetched products:', products.totalDocs)

  return { products }
}

export default async function ShoppingPage() {
  const cookieStore = await cookies()
  const { products } = await getProducts()

  // Example: fetch user using cookies (adjust to your API)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-route/get-user`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  })

  let user: any = null
  if (res.ok) {
    const data = await res.json()
    user = data.user
  }

  return (
    <div className="py-6 px-4 mx-auto">
      <div className="mb-2 text-center">
        <h2 className="text-4xl font-semibold leading-tight">Browse Our Sneakers Collection</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-base">
          Handpicked products just for you — shop quality and style in one place.
        </p>
      </div>

      {/* Product list */}
      <ProductsList products={products} />

      {/* Dialog if user is not logged in */}
      {!user && <AuthDialog />}
    </div>
  )
}
