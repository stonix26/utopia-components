import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { addDays, format } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@utopia/classnames'
import { Button } from '@utopia/button'
import { Calendar } from '@utopia/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@utopia/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@utopia/select'

function DatePickerDemo(): JSX.Element {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single"
          onSelect={setDate}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  )
}

function DatePickerWithRange({
  className
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() // Note: Months are zero-based (0 for January)
  const day = currentDate.getDate()
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(year, month, day),
    to: addDays(new Date(year, month, day), 16)
  })

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
            id="date"
            variant="outline"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {
              // eslint-disable-next-line no-nested-ternary -- TODO
              date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date?.from}
            initialFocus
            mode="range"
            numberOfMonths={2}
            onSelect={setDate}
            selected={date}
            showOutsideDays={false}
            showWeekNumber
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function DatePickerWithPresets(): JSX.Element {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={value => {
            setDate(addDays(new Date(), parseInt(value)))
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" onSelect={setDate} selected={date} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

const meta: Meta<typeof DatePickerDemo> = {
  component: DatePickerDemo
}

export default meta

export const DatePicker: StoryObj<typeof DatePickerDemo> = {
  render: () => <DatePickerDemo />
}

export const DateRangePicker: StoryObj<typeof DatePickerWithRange> = {
  render: () => <DatePickerWithRange />
}

export const WithPresets: StoryObj<typeof DatePickerWithPresets> = {
  render: () => <DatePickerWithPresets />
}
