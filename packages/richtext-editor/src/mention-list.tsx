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
      <div className="relative bg-white drop-shadow-xl overflow-hidden p-2">
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              className={cn(
                'bg-transparent border border-transparent rounded block px-2 py-1 text-base text-left w-full',
                index === selectedIndex && 'border-secondary-darker'
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
          <div className="bg-transparent border border-transparent rounded block px-2 py-1 text-base text-left w-full">
            No result
          </div>
        )}
      </div>
    )
  }
)
