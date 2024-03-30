import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertDescription, AlertTitle } from '@utopia/radix-alert'
import { Terminal } from 'lucide-react'

const meta: Meta<typeof Alert> = {
  component: Alert
}

export default meta

const AlertTemplate: StoryObj<typeof Alert> = {
  render: args => (
    <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}

export const Default: StoryObj<typeof AlertTemplate> = {
  ...AlertTemplate,
  args: {
    variant: 'default'
  }
}

export const Destructive: StoryObj<typeof AlertTemplate> = {
  ...AlertTemplate,
  args: {
    variant: 'destructive'
  }
}
