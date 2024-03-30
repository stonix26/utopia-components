import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Email from '../../examples/email'

const meta: Meta<typeof Email> = {
  component: Email,
  parameters: {
    autodocs: false
  }
}

export default meta

type Story = StoryObj<typeof Email>

export const EmailExample: Story = {
  render: () => <Email />
}
