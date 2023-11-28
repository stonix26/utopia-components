import React from 'react'
import { Toaster } from '@utopia/toast'
import '../index.css'

export default {
  decorators: [
    Story => (
      <>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
        <Toaster />
      </>
    )
  ]
}
