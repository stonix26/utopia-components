import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@utopia/radix-progress'

const meta: Meta<typeof Progress> = {
  component: Progress
}

export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: args => <Progress {...args} />,
  args: {
    value: 33
  }
}
