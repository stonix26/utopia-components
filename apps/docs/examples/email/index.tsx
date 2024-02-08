import React, { useState } from 'react'
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
import { Tabs, TabsList, TabsTrigger } from '@utopia/tabs'
import { Separator } from '@utopia/separator'
import { MailPreviewCard, SidebarTrigger, TabsContent } from './components'
import { USER_SELECT, SIDEBAR_DATA, INBOX_DATA } from './data'

function Email(): React.JSX.Element {
  const [user, setUser] = useState(USER_SELECT[0].value)
  const userIndex = USER_SELECT.findIndex(e => e.value === user)
  const UserIcon = USER_SELECT[userIndex].icon
  return (
    <div className="flex h-full max-h-[800px] w-full flex-col border shadow-lg">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15} maxSize={15} minSize={4}>
          <div className="flex h-full flex-col">
            <div className="h-fit p-1.5 py-2">
              <Select onValueChange={setUser} value={user}>
                <SelectTrigger>
                  <SelectValue aria-label={user}>
                    <div className="flex items-center">
                      <UserIcon className="mr-2 inline h-4 w-4" />
                      <span>{USER_SELECT[userIndex].name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {USER_SELECT.map(u => (
                    <SelectItem key={u.email} value={u.value}>
                      {u.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator decorative />
            <div className="flex h-fit flex-col gap-1 border-b px-1.5 py-2">
              {SIDEBAR_DATA.primary.map(c => (
                <SidebarTrigger key={c.name} {...c} />
              ))}
            </div>
            <div className="flex h-full flex-col gap-1 px-1.5 py-2">
              {SIDEBAR_DATA.secondary.map(c => (
                <SidebarTrigger key={c.name} {...c} />
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
              {INBOX_DATA.map(i => (
                <MailPreviewCard key={i.id} {...i} />
              ))}
            </TabsContent>
            <TabsContent value="unread">
              {INBOX_DATA.filter(i => !i.read).map(k => (
                <MailPreviewCard key={k.id} {...k} />
              ))}
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
