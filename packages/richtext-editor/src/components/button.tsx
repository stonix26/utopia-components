import { Button as UtopiaButton, type ButtonProps } from '@utopia/button'
import { cn } from '@utopia/classnames'
import { type LucideIcon } from 'lucide-react'
import { type ElementRef, forwardRef } from 'react'

interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  isActive?: boolean
  icon?: LucideIcon
  icon_right?: LucideIcon
  button_name?: string
}

const Button = forwardRef<ElementRef<typeof UtopiaButton>, CustomButtonProps>(
  function Button(props, ref) {
    const Icon = props.icon
    const IconRight = props.icon_right
    return (
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