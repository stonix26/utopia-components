import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@utopia/radix-badge'

const meta: Meta<typeof Badge> = {
  component: Badge
}

export default meta

const BadgeTemplate: StoryObj<typeof Badge> = {
  render: args => <Badge {...args}>Badge</Badge>
}

type Story = StoryObj<typeof BadgeTemplate>

export const Default: Story = {
  ...BadgeTemplate,
  args: {
    variant: 'default'
  }
}

export const Secondary: Story = {
  ...BadgeTemplate,
  args: {
    variant: 'secondary'
  }
}

export const Outline: Story = {
  ...BadgeTemplate,
  args: {
    variant: 'outline'
  }
}

export const Destructive: Story = {
  ...BadgeTemplate,
  args: {
    variant: 'destructive'
  }
}
