import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@utopia/textarea'

const meta: Meta<typeof Textarea> = {
  component: Textarea
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => <Textarea placeholder="Type your message here." />
}
