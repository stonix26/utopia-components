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
      <div className="relative overflow-hidden bg-white p-2 drop-shadow-xl">
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              className={cn(
                'block w-full rounded border border-transparent bg-transparent px-2 py-1 text-left text-base',
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
          <div className="block w-full rounded border border-transparent bg-transparent px-2 py-1 text-left text-base">
            No result
          </div>
        )}
      </div>
    )
  }
)
