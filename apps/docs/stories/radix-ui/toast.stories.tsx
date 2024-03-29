import type { Meta } from '@storybook/react'
import { Button } from '@utopia/radix-button'
import { ToastAction as Toast, useToast } from '@utopia/radix-toast'

const meta: Meta = {
  component: Toast
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
          action: <Toast altText="Goto schedule to undo">Undo</Toast>
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
          action: <Toast altText="Try again">Try again</Toast>
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
          action: <Toast altText="Try again">Try again</Toast>
        })
      }}
      variant="outline"
    >
      Show Toast
    </Button>
  )
}
