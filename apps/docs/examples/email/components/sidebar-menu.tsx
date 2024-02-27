import React from 'react'
import { Button } from '@utopia/button'
import type { SidebarDataInterface, SidebarTriggerProps } from '../types'

function SidebarTrigger(props: SidebarTriggerProps): JSX.Element {
  const { isCollasped, name, items, isActive, icon: Icon } = props
  return isCollasped ? (
    <Button
      className="inline-flex w-full items-center justify-center"
      size="sm"
      variant={isActive ? 'default' : 'ghost'}
    >
      <Icon className="inline h-4 w-4" />
    </Button>
  ) : (
    <Button
      className="inline-flex w-full items-center justify-between"
      size="sm"
      variant={isActive ? 'default' : 'ghost'}
    >
      <span className="inline-flex items-center">
        <Icon className="mr-2 inline h-4 w-4" />
        {name}
      </span>
      {items ? <span>{items}</span> : null}
    </Button>
  )
}

interface SidebarMenuProps {
  items: SidebarDataInterface
  isCollapsed?: boolean
}

function SidebarMenu(props: SidebarMenuProps): JSX.Element {
  const { items, isCollapsed } = props
  return (
    <>
      <div className="flex h-fit flex-col gap-1 border-b px-1.5 py-2">
        {items.primary.map(c => (
          <SidebarTrigger isCollasped={isCollapsed} key={c.name} {...c} />
        ))}
      </div>
      <div className="flex h-full flex-col gap-1 px-1.5 py-2">
        {items.secondary.map(c => (
          <SidebarTrigger isCollasped={isCollapsed} key={c.name} {...c} />
        ))}
      </div>
    </>
  )
}

export default SidebarMenu
