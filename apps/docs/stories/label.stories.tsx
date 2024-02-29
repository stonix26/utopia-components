import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@utopia/radix-label'
import { Checkbox } from '@utopia/radix-checkbox'

const meta: Meta<typeof Label> = {
  component: Label
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: args => (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label {...args}>Accept terms and conditions</Label>
      </div>
    </div>
  ),
  args: {
    htmlFor: 'terms'
  }
}
