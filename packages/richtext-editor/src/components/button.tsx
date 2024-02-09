import { Button as UtopiaButton, type ButtonProps } from '@utopia/button'
import { cn } from '@utopia/classnames'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger
} from '@utopia/tooltip'
import { type LucideIcon } from 'lucide-react'
import { type ElementRef, forwardRef } from 'react'

interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  isActive?: boolean
  icon?: LucideIcon
  icon_right?: LucideIcon
  button_name?: string
  tooltip?: string
}

const Button = forwardRef<ElementRef<typeof UtopiaButton>, CustomButtonProps>(
  function Button(props, ref) {
    const Icon = props.icon
    const IconRight = props.icon_right
    return props.tooltip ? (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <UtopiaButton
            className={cn(
              'flex items-center justify-between gap-2',
              props.isActive &&
                'bg-accent text-accent-foreground hover:bg-secondary hover:text-secondary-foreground'
            )}
            ref={ref}
            size="xs"
            variant="ghost"
            {...props}
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {props.button_name}
            {IconRight ? <IconRight className="h-4 w-4" /> : null}
          </UtopiaButton>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            <p>{props.tooltip}</p>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    ) : (
      <UtopiaButton
        className={cn(
          'flex items-center justify-between gap-2',
          props.isActive &&
            'bg-accent text-accent-foreground hover:bg-secondary hover:text-secondary-foreground'
        )}
        ref={ref}
        size="xs"
        variant="ghost"
        {...props}
      >
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {props.button_name}
        {IconRight ? <IconRight className="h-4 w-4" /> : null}
      </UtopiaButton>
    )
  }
)

export default Button
