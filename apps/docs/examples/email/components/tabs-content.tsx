import React from 'react'
import { TabsContent as TabsContentPrimitive } from '@utopia/radix-tabs'
import { Input } from '@utopia/radix-input'
import { ScrollArea } from '@utopia/radix-scroll-area'
import type { TabsContentProps } from '../types'

function TabsContent({ children, value }: TabsContentProps): React.JSX.Element {
  return (
    <TabsContentPrimitive value={value}>
      <div className="flex h-fit items-center justify-center px-4 pb-4 pt-2">
        <Input placeholder="Search..." />
      </div>
      <ScrollArea className="h-screen">
        <div className="flex flex-col gap-2 p-4 pt-0">{children}</div>
      </ScrollArea>
    </TabsContentPrimitive>
  )
}

export default TabsContent
