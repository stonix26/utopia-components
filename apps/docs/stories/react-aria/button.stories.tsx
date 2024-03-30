import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@utopia/rac-button'

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  args: {
    type: 'button',
    variant: 'default',
    size: 'default'
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['button', 'submit', 'reset']
    },
    variant: {
      control: { type: 'radio' },
      description: 'lorem50',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link'
      ]
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'xs', 'sm', 'lg', 'icon']
    }
  }
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: args => <Button {...args} />,
  args: {
    children: 'RAC Button',
    onPress: () => {
      // eslint-disable-next-line no-alert -- testing only
      alert('Hello from Turborepo!')
    }
  }
}
