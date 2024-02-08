import React, { FC, ReactNode, useState } from 'react'
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
import { Input } from '@utopia/input'
import { Badge } from '@utopia/badge'
import { IInboxPreview, SidebarTriggerProps } from './types'
import { user_select, sidebar_data, inbox_data } from './data'
import { Separator } from '@utopia/separator'
import { ScrollArea } from '@utopia/scroll-area'

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

const TabsContentContainer: FC<{ children: ReactNode }> = props => (
  <>
    <div className="flex h-fit items-center justify-center px-4 pb-4 pt-2">
      <Input placeholder="Search..." />
    </div>
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">{props.children}</div>
    </ScrollArea>
  </>
)

const MailPreviewCard: FC<IInboxPreview> = props => (
  <button
    id={props.id}
    className="flex w-full flex-col gap-y-2 rounded-md border border-border p-4 hover:bg-accent"
  >
    <div className="flex w-full items-center justify-between">
      <p className="inline-flex items-center font-semibold">
        {props.sender}{' '}
        {props.read ? null : (
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
        )}
      </p>
      <p className="text-xs text-foreground">{props.date_sent}</p>
    </div>
    <p className="text-xs font-medium">{props.title}</p>
    <div className="line-clamp-2 text-left text-xs text-muted-foreground">
      {props.content}
    </div>
    <div className="flex gap-2">
      {props.tags.map(tag => (
        <Badge
          key={tag.name}
          variant={tag.variant ?? 'default'}
          className="rounded-md"
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  </button>
)

const Email = () => {
  const [user, setUser] = useState(user_select[0].value)
  const user_index = user_select.findIndex(e => e.value === user)
  const UserIcon = user_select[user_index].icon
  return (
    <div className="flex h-full max-h-[800px] w-full flex-col border shadow-lg">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} minSize={4} maxSize={15}>
          <div className="flex h-full flex-col">
            <div className="h-fit p-1.5 py-2">
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
            <Separator decorative />
            <div className="flex h-fit flex-col gap-1 border-b px-1.5 py-2">
              {sidebar_data.primary.map(c => (
                <SidebarTrigger {...c} />
              ))}
            </div>
            <div className="flex h-full flex-col gap-1 px-1.5 py-2">
              {sidebar_data.secondary.map(c => (
                <SidebarTrigger {...c} />
              ))}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30}>
          <Tabs defaultValue="all-mail">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger value="all-mail">All mail</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </div>
            <Separator decorative />
            <TabsContent value="all-mail">
              <TabsContentContainer>
                {inbox_data.map(i => (
                  <MailPreviewCard key={i.id} {...i} />
                ))}
              </TabsContentContainer>
            </TabsContent>
            <TabsContent value="unread">
              <TabsContentContainer>
                {inbox_data
                  .filter(i => i.read === false)
                  .map(k => (
                    <MailPreviewCard key={k.id} {...k} />
                  ))}
              </TabsContentContainer>
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
