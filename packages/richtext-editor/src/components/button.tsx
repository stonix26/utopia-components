import { Button as UtopiaButton, type ButtonProps } from '@utopia/button'
import { type LucideIcon } from 'lucide-react'
import { type ElementRef, forwardRef } from 'react'

interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
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
        className="flex items-center justify-between gap-2"
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
