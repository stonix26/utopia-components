import React, { type FC, type RefAttributes, forwardRef } from 'react'
import { Button, type ButtonProps } from '@utopia/button'
import type { LucideIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger
} from '@utopia/tooltip'

interface ButtonIconProps extends Omit<ButtonProps, 'children'> {
  icon: LucideIcon
  tooltip?: string
}

const ButtonIcon: FC<ButtonIconProps & RefAttributes<HTMLButtonElement>> =
  forwardRef(function ButtonPrimitive(
    { icon, tooltip, variant = 'ghost', size = 'icon', ...props },
    ref
  ) {
    const Icon = icon
    return !tooltip ? (
      <Button ref={ref} size={size} variant={variant} {...props}>
        <Icon className="h-4 w-4" />
      </Button>
    ) : (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button ref={ref} size={size} variant={variant} {...props}>
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    )
  })

export default ButtonIcon
