import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@utopia/input'

const meta: Meta<typeof Input> = {
  component: Input
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: props => <Input {...props} />,
  name: 'Input',
  args: {
    type: 'email',
    placeholder: 'Email'
  }
}
