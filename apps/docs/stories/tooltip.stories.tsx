import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@utopia/button'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  // TooltipProvider,
  TooltipTrigger
} from '@utopia/tooltip'

const meta: Meta<typeof Tooltip> = {
  component: Tooltip
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    // <TooltipProvider> --> Provide to the root of your App
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
    // </TooltipProvider>
  )
}
