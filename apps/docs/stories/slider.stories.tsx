import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@utopia/slider'

const meta: Meta<typeof Slider> = {
  component: Slider
}

export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => <Slider className="w-[60%]" defaultValue={[50]} max={100} />
}
