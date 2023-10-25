import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from '@utopia/avatar'

const meta: Meta<typeof Avatar> = {
  component: Avatar
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: props => (
    <Avatar {...props}>
      <AvatarImage alt="@stonix26" src="https://github.com/stonix26.png" />
      <AvatarFallback>RE</AvatarFallback>
    </Avatar>
  ),
  name: 'Avatar'
}
