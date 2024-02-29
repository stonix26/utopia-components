import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@utopia/radix-button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@utopia/radix-collapsible'

const meta: Meta<typeof Collapsible> = {
  component: Collapsible
}

export default meta

function CollapsibleDemo(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      className="w-[350px] space-y-2"
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button className="w-9 p-0" size="sm" variant="ghost">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => <CollapsibleDemo />
}
