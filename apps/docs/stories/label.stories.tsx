import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@utopia/label'
import { Checkbox } from '@utopia/checkbox'

const meta: Meta<typeof Label> = {
  component: Label
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: props => (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label {...props}>Accept terms and conditions</Label>
      </div>
    </div>
  ),
  name: 'Label',
  args: {
    htmlFor: 'terms'
  }
}
