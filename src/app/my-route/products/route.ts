import { NextResponse } from 'next/server'
import payload from '@/lib/payload'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sort = searchParams.get('sort') || 'latest'
    const sortOrder = sort === 'oldest' ? 'asc' : 'desc'

    const result = await payload.find({
      collection: 'products',
      sort: `createdAt:${sortOrder}`,
    })

    return NextResponse.json({
      products: result, // ✅ this ensures `products.docs` exists
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
