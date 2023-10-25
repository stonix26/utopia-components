import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertDescription, AlertTitle } from '@utopia/alert'
import { Terminal } from 'lucide-react'

const meta: Meta<typeof Alert> = {
  component: Alert
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: props => (
    <Alert {...props}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  name: 'Alert'
}
