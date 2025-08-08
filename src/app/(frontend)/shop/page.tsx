// 'use client'

// import ProductsList from '@/components/ProductsList'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// // import payload from '@/lib/payload'
// import { useState } from 'react'

// const ShoppingPage = () => {
//   const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')

//   return (
//     <div className="py-6 px-4">
//       <div className="mb-6 ms-14">
//         <h2 className="text-4xl font-semibold leading-tight">Browse Our Collection</h2>
//         <p className="mt-2 text-gray-700 dark:text-gray-300 text-base">
//           Handpicked products just for you — shop quality and style in one place.
//         </p>

//         <div className="mt-2.5 space-y-2.5">
//           <h2 className="font-semibold text-xl">Sort By</h2>
//           <RadioGroup
//             defaultValue="latest"
//             className="flex gap-x-6 items-center"
//             onValueChange={(value) => setSortOrder(value as 'latest' | 'oldest')}
//           >
//             <div className="flex items-center gap-1">
//               <RadioGroupItem value="latest" id="latest" />
//               <Label htmlFor="latest">Latest</Label>
//             </div>
//             <div className="flex items-center gap-1">
//               <RadioGroupItem value="oldest" id="oldest" />
//               <Label htmlFor="oldest">Oldest</Label>
//             </div>
//           </RadioGroup>
//         </div>
//       </div>
//       <ProductsList />
//     </div>
//   )
// }

// export default ShoppingPage

'use client'

import { useState } from 'react'
import ProductsList from '@/components/ProductsList'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const ShoppingPage = () => {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')

  return (
    <div className="py-6 px-4">
      <div className="mb-6 ms-14">
        <h2 className="text-4xl font-semibold leading-tight">Browse Our Collection</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-base">
          Handpicked products just for you — shop quality and style in one place.
        </p>

        <div className="mt-2.5 space-y-2.5">
          <h2 className="font-semibold text-xl">Sort By</h2>
          <RadioGroup
            defaultValue="latest"
            className="flex gap-x-6 items-center"
            onValueChange={(value) => setSortOrder(value as 'latest' | 'oldest')}
          >
            <div className="flex items-center gap-1">
              <RadioGroupItem value="latest" id="latest" />
              <Label htmlFor="latest">Latest</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="oldest" id="oldest" />
              <Label htmlFor="oldest">Oldest</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <ProductsList sortOrder={sortOrder} />
    </div>
  )
}

export default ShoppingPage
