import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from '@utopia/aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio
}

export default meta

type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: props => (
    <AspectRatio {...props}>
      <img
        alt=""
        className="rounded-md object-cover"
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      />
    </AspectRatio>
  ),
  name: 'Aspect Ratio',
  args: {
    ratio: 16 / 9,
    className: 'bg-muted'
  }
}
