import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@utopia/radix-select'
import React from 'react'
import type { UserInterface } from '../types'

interface UserSelectProps {
  user: string
  setUser: (user: string) => void
  users: UserInterface[]
  isCollapsed?: boolean
}

function UserSelect(props: UserSelectProps): React.ReactElement {
  const { user, setUser, users, isCollapsed } = props
  const userIndex = users.findIndex(e => e.value === user)
  const UserIcon = users[userIndex].icon
  return (
    <Select onValueChange={setUser} value={user}>
      {isCollapsed ? (
        <SelectTrigger className="justify-center">
          <SelectValue aria-label={user}>
            <div className="flex items-center">
              <UserIcon className="h-4 w-4" />
            </div>
          </SelectValue>
        </SelectTrigger>
      ) : (
        <SelectTrigger>
          <SelectValue aria-label={user}>
            <div className="flex items-center">
              <UserIcon className="mr-2 inline h-4 w-4" />
              {users[userIndex].email}
            </div>
          </SelectValue>
          <SelectIcon />
        </SelectTrigger>
      )}
      <SelectContent>
        {users.map(u => (
          <SelectItem key={u.email} value={u.value}>
            {u.email}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default UserSelect
