import React from 'react'
import { TooltipProvider } from '@utopia/radix-tooltip'
import { Toaster } from '@utopia/radix-toast'
import '../index.css'

export default {
  decorators: [
    Story => (
      <TooltipProvider>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
        <Toaster />
      </TooltipProvider>
    )
  ]
}
