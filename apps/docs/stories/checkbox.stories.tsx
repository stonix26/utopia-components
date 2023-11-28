import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@utopia/checkbox'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: args => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="terms"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
  name: 'Checkbox',
  args: {
    id: 'terms'
  }
}
