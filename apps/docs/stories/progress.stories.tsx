import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@utopia/progress'

const meta: Meta<typeof Progress> = {
  component: Progress
}

export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: props => <Progress {...props} />,
  name: 'Accordion',
  args: {
    value: 33
  }
}