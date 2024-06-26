import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@utopia/radix-label'
import { Switch } from '@utopia/radix-switch'

const meta: Meta<typeof Switch> = {
  component: Switch,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
