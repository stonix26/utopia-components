import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@utopia/radix-label'
import { RadioGroup, RadioGroupItem } from '@utopia/radix-radio-group'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: args => (
    <RadioGroup {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="r1" value="default" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="r2" value="comfortable" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="r3" value="compact" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'comfortable'
  }
}
