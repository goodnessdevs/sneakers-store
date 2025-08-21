'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function SortControls() {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest')

  return (
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
  )
}
