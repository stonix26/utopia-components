import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@utopia/radix-slider'
import { useState } from 'react'

const meta: Meta<typeof Slider> = {
  component: Slider
}

export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => <Slider className="w-[60%]" defaultValue={[25]} />
}

const arrayToString = (array: number[]): string => {
  return `[${array.join(', ')}]`
}

export function Controlled(): JSX.Element {
  const [value, setValue] = useState([130, 188, 243])
  return (
    <div className="flex flex-col items-center gap-y-4">
      <pre>
        <code>value: {arrayToString(value)}</code>
      </pre>
      <Slider
        className="w-full"
        max={360}
        min={0}
        onValueChange={setValue}
        value={value}
      />
    </div>
  )
}
