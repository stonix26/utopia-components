'use client'

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef
} from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@utopia/classnames'

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  const internalValue = value ?? defaultValue

  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      defaultValue={defaultValue}
      ref={ref}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {internalValue?.map((_, i) => (
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          // eslint-disable-next-line react/no-array-index-key -- TEMP
          key={i}
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
