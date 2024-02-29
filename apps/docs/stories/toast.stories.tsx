import type { Meta } from '@storybook/react'
import { Button } from '@utopia/radix-button'
import { ToastAction, useToast } from '@utopia/radix-toast'

const meta: Meta = {
  title: 'Toast'
}

export default meta

export function ToastDemo(): JSX.Element {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Scheduled: Catch up ',
          description: 'Friday, February 10, 2023 at 5:57 PM',
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          )
        })
      }}
      variant="outline"
    >
      Add to calendar
    </Button>
  )
}

export function ToastSimple(): JSX.Element {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          description: 'Your message has been sent.'
        })
      }}
      variant="outline"
    >
      Show Toast
    </Button>
  )
}

export function ToastWithTitle(): JSX.Element {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        })
      }}
      variant="outline"
    >
      Show Toast
    </Button>
  )
}

export function ToastWithAction(): JSX.Element {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: <ToastAction altText="Try again">Try again</ToastAction>
        })
      }}
      variant="outline"
    >
      Show Toast
    </Button>
  )
}

export function ToastDestructive(): JSX.Element {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: <ToastAction altText="Try again">Try again</ToastAction>
        })
      }}
      variant="outline"
    >
      Show Toast
    </Button>
  )
}
