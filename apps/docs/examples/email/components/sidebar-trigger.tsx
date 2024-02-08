import React from 'react'
import { Button } from '@utopia/button'
import type { SidebarTriggerProps } from '../types'

function SidebarTrigger(props: SidebarTriggerProps): React.JSX.Element {
  return (
    <Button
      className="inline-flex w-full items-center justify-between"
      size="sm"
      variant={props.is_active ? 'default' : 'ghost'}
    >
      <span className="inline-flex items-center">
        <props.icon className="mr-2 inline h-4 w-4" />
        {props.name}
      </span>
      {props.items ? <span>{props.items}</span> : null}
    </Button>
  )
}

export default SidebarTrigger
