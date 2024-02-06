import React, { FC, useState } from 'react'
import {
  Inbox,
  File,
  Send,
  LucideIcon,
  Trash2,
  Archive,
  ArchiveX,
  Users2,
  AlertCircle,
  MessageSquare,
  ShoppingCart,
  Slack,
  Twitch,
  Podcast
} from 'lucide-react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@utopia/resizable'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@utopia/select'
import { Button } from '@utopia/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@utopia/tabs'

interface SidebarTriggerProps {
  name: string
  icon: LucideIcon
  items?: number
  is_active?: boolean
}

interface ISidebarData {
  primary: SidebarTriggerProps[]
  secondary: SidebarTriggerProps[]
}

const sidebar_data: ISidebarData = {
  primary: [
    {
      name: 'Inbox',
      icon: Inbox,
      items: 128,
      is_active: true
    },
    {
      name: 'Drafts',
      icon: File,
      items: 11,
      is_active: false
    },
    {
      name: 'Sent',
      icon: Send,
      is_active: false
    },
    {
      name: 'Junk',
      icon: ArchiveX,
      items: 23,
      is_active: false
    },
    {
      name: 'Trash',
      icon: Trash2,
      is_active: false
    },
    {
      name: 'Archive',
      icon: Archive,
      is_active: false
    }
  ],
  secondary: [
    {
      name: 'Social',
      icon: Users2,
      items: 972,
      is_active: false
    },
    {
      name: 'Updates',
      icon: AlertCircle,
      items: 342,
      is_active: false
    },
    {
      name: 'Forums',
      icon: MessageSquare,
      items: 128,
      is_active: false
    },
    {
      name: 'Shopping',
      icon: ShoppingCart,
      items: 8,
      is_active: false
    },
    {
      name: 'Promotions',
      icon: Archive,
      items: 21,
      is_active: false
    }
  ]
}

const SidebarTrigger: FC<SidebarTriggerProps> = props => {
  return (
    <Button
      size="sm"
      className="inline-flex w-full items-center justify-between"
      variant={props.is_active ? 'default' : 'ghost'}
    >
      <span className="inline-flex items-center">
        <props.icon className="mr-2 inline h-4 w-4" />
        {props.name}
      </span>
      {props.items && <span>{props.items}</span>}
    </Button>
  )
}

interface IUser {
  name: string
  value: string
  icon: LucideIcon
  email: string
}

const user_select: IUser[] = [
  {
    name: 'Alicia Koch',
    value: 'alicia@example.com',
    icon: Podcast,
    email: 'alicia@example.com'
  },
  {
    name: 'Alicia Koch',
    value: 'alicia@gmail.com',
    icon: Slack,
    email: 'alicia@gmail.com'
  },
  {
    name: 'Alicia Koch',
    value: 'alicia@me.com',
    icon: Twitch,
    email: 'alicia@me.com'
  }
]

const Email = () => {
  const [user, setUser] = useState(user_select[0].value)
  const user_index = user_select.findIndex(e => e.value === user)
  const UserIcon = user_select[user_index].icon
  return (
    <div className="h-[50rem] border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} minSize={4} maxSize={15}>
          <div className="flex h-full flex-col">
            <div className="h-fit border-b p-1.5">
              <Select value={user} onValueChange={setUser}>
                <SelectTrigger>
                  <SelectValue aria-label={user}>
                    <div className="flex items-center">
                      <UserIcon className="mr-2 inline h-4 w-4" />
                      <span>{user_select[user_index].name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {user_select.map(u => (
                    <SelectItem key={u.email} value={u.value}>
                      {u.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex h-fit flex-col gap-1 border-b p-1.5">
              {sidebar_data.primary.map(c => (
                <SidebarTrigger {...c} />
              ))}
            </div>
            <div className="flex h-full flex-col gap-1 p-1.5">
              {sidebar_data.secondary.map(c => (
                <SidebarTrigger {...c} />
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30}>
          <Tabs defaultValue="all-mail">
            <div className="flex items-center justify-between border-b p-1.5">
              <h2 className="text-xl font-black">Inbox</h2>
              <TabsList>
                <TabsTrigger value="all-mail">All mail</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all-mail">
              <p>All mail</p>
            </TabsContent>
            <TabsContent value="unread">
              <p>Unread mails</p>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={10}>
          <span className="font-semibold">Three</span>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Email
