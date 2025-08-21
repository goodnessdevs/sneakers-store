'use client'

import { useState } from 'react'

export default function AddToCartSection({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1)

  const increment = () => setQuantity((q) => q + 1)
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1))

  const handleAddToCart = () => {
    // TODO: Hook into cart state / API
    console.log(`Added ${quantity} of ${productId} to cart`)
  }

  return (
    <div className="mt-6 flex items-center gap-6">
      {/* Quantity Selector */}
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          –
        </button>
        <span className="px-6 py-2 text-lg font-medium">{quantity}</span>
        <button
          onClick={increment}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="px-8 py-3 bg-gradient-to-r from-rose-500 to-cyan-500 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
      >
        Add to Cart
      </button>
    </div>
  )
}
