import type { HTMLAttributes } from 'react'
import { cn } from '@utopia/classnames'

function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
