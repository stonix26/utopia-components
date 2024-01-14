import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { cn } from '@utopia/classnames'

export interface MentionListProps {
  command: (arg0: { id: string }) => unknown
  items: string[]
}

export const MentionList = forwardRef<unknown, MentionListProps>(
  function MentionList(props, ref) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const selectItem = (index: number): void => {
      const item = props.items[index]

      if (item) {
        props.command({ id: item })
      }
    }

    const upHandler = (): void => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      )
    }

    const downHandler = (): void => {
      setSelectedIndex((selectedIndex + 1) % props.items.length)
    }

    const enterHandler = (): void => {
      selectItem(selectedIndex)
    }

    useEffect(() => {
      setSelectedIndex(0)
    }, [props.items])

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === 'ArrowUp') {
          upHandler()
          return true
        }

        if (event.key === 'ArrowDown') {
          downHandler()
          return true
        }

        if (event.key === 'Enter') {
          enterHandler()
          return true
        }

        return false
      }
    }))

    return (
      <div className="min-w-32 relative z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              className={cn(
                'block w-full rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                index === selectedIndex && 'bg-accent text-accent-foreground'
              )}
              // eslint-disable-next-line react/no-array-index-key -- TODO
              key={index}
              onClick={() => {
                selectItem(index)
              }}
              type="button"
            >
              {item}
            </button>
          ))
        ) : (
          <div className="block w-full rounded-sm px-2 py-1.5 text-left text-sm outline-none">
            No result
          </div>
        )}
      </div>
    )
  }
)
