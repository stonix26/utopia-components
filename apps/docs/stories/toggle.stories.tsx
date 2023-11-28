import type { Meta, StoryObj } from '@storybook/react'
import { Bold, Italic, Underline } from 'lucide-react'
import { Toggle } from '@utopia/toggle'

const meta: Meta<typeof Toggle> = {
  component: Toggle
}

export default meta

type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}

export const Outline: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic" variant="outline">
      <Italic className="h-4 w-4" />
    </Toggle>
  )
}

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <Italic className="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  )
}

export const Small: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic" size="sm">
      <Italic className="h-4 w-4" />
    </Toggle>
  )
}

export const Large: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic" size="lg">
      <Italic className="h-4 w-4" />
    </Toggle>
  )
}

export const Disabled: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic" disabled>
      <Underline className="h-4 w-4" />
    </Toggle>
  )
}
