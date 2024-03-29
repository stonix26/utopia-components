import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '@utopia/radix-calendar'

function CalendarComponent(): JSX.Element {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <Calendar
      className="rounded-md border"
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  )
}

const meta: Meta<typeof Calendar> = {
  component: Calendar
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => <CalendarComponent />
}
