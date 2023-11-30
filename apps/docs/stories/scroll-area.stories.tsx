import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '@utopia/scroll-area'
import { Separator } from '@utopia/separator'

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea
}

export default meta

type Story = StoryObj<typeof ScrollArea>

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export const Default: Story = {
  render: args => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map(tag => (
          <>
            <div className="text-sm" key={tag}>
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  ),
  args: {
    className: 'h-72 w-48 rounded-md border'
  }
}
