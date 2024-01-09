import { Popover, PopoverContent, PopoverTrigger } from '@utopia/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@utopia/command'
import { ChevronsUpDown, type LucideIcon } from 'lucide-react'
import { ScrollArea } from '@utopia/scroll-area'
import Button from './button'

export interface Item {
  name: string
  icon?: LucideIcon
  value?: string | undefined
  onSelect?: ((value: string) => void) | undefined
}

export interface Group {
  name: string
  items: Item[]
}

export interface ComboboxProps {
  withSearch?: boolean
  placeholder?: string
  emptyText?: string
  onOpenChange?: ((open: boolean) => void) | undefined
  open?: boolean | undefined
  trigger: {
    name: string
    icon?: LucideIcon
  }
  items: Group[]
}

function Combobox({
  placeholder,
  emptyText,
  onOpenChange,
  open,
  trigger,
  items
}: ComboboxProps): JSX.Element {
  return (
    <Popover onOpenChange={onOpenChange} open={open}>
      <PopoverTrigger asChild>
        <Button
          button_name={trigger.name}
          icon={trigger.icon}
          icon_right={ChevronsUpDown}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-40 p-0">
        <Command>
          <CommandInput placeholder={placeholder ?? 'Search...'} />
          <CommandEmpty>{emptyText ?? 'No something found.'}</CommandEmpty>
          <CommandList>
            <ScrollArea className="h-72 w-40">
              {items.map(group => (
                <CommandGroup key={group.name}>
                  {group.items.map(item => {
                    const ItemIcon = item.icon
                    return (
                      <CommandItem
                        key={item.name}
                        onSelect={item.onSelect}
                        value={item.value}
                      >
                        {ItemIcon ? (
                          <ItemIcon className="mr-2 h-4 w-4" />
                        ) : null}{' '}
                        {item.name}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Combobox
