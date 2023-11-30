import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@utopia/badge'

const meta: Meta<typeof Badge> = {
  component: Badge
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: args => <Badge {...args}>Badge</Badge>
}
