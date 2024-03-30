import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@utopia/radix-textarea'

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => <Textarea placeholder="Type your message here." />
}
