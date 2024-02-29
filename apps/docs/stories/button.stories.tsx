import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@utopia/radix-button'

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['button', 'submit', 'reset']
    }
  }
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: args => <Button {...args} />,
  args: {
    children: 'Hello',
    type: 'button',
    onClick: () => {
      // eslint-disable-next-line no-alert -- testing only
      alert('Hello from Turborepo!')
    }
  }
}
