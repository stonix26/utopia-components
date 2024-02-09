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
import { Button } from '@utopia/button'
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@utopia/avatar'
import { Switch } from '@utopia/switch'
import { Label } from '@utopia/label'
import { RichtextEditor, useEditor } from '@utopia/richtext-editor'
import { USER_SELECT, SIDEBAR_DATA, INBOX_DATA } from './data'
import { MailPreviewCard, SidebarTrigger, TabsContent } from './components'

function Email(): React.JSX.Element {
  const [user, setUser] = useState(USER_SELECT[0].value)
  const userIndex = USER_SELECT.findIndex(e => e.value === user)
  const UserIcon = USER_SELECT[userIndex].icon

  const editor = useEditor({ editable: true })

  return (
    <div className="flex h-full max-h-[800px] w-full flex-col border shadow-lg">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          collapsedSize={3.25}
          collapsible
          defaultSize={15}
          maxSize={15}
          minSize={10}
        >
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
        <ResizablePanel defaultSize={55} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="flex h-fit flex-wrap justify-between px-1.5 py-2">
              <div className="flex gap-x-2">
                <Button size="icon" variant="ghost">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <ArchiveX className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Separator decorative orientation="vertical" />
                <Button size="icon" variant="ghost">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-x-2">
                <Button size="icon" variant="ghost">
                  <Reply className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <ReplyAll className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Forward className="h-4 w-4" />
                </Button>
                <Separator decorative orientation="vertical" />
                <Button size="icon" variant="ghost">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator decorative />
            <div className="flex flex-1 flex-col divide-y border-b">
              <div className="flex h-fit gap-x-4 p-4">
                <Avatar>
                  <AvatarImage
                    alt="@stonix26"
                    src="https://github.com/stonix26.png"
                  />
                  <AvatarFallback>RE</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="inline-flex w-full items-center justify-between font-semibold">
                    <span className="line-clamp-2">William Smith</span>
                    <span className="line-clamp-3 text-xs font-normal text-muted-foreground">
                      Oct 22, 2023, 9:00:00 AM
                    </span>
                  </p>
                  <p className="line-clamp-1 text-xs">Meeting Tomorrow</p>
                  <p className="line-clamp-1 text-xs">
                    Reply-To: williamsmith@example.com
                  </p>
                </div>
              </div>
              <div className="flex-1 p-4 text-sm">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dicta, velit at. Vel totam ab, minus qui asperiores est
                  impedit hic aliquid autem distinctio reprehenderit magni? Fuga
                  recusandae dolores ea minus veritatis illo delectus quod
                  nostrum officiis. Ipsam, praesentium blanditiis, dolores ab
                  repellendus quaerat tenetur corporis eum rerum, provident cum
                  ut.
                </p>
              </div>
            </div>
            <div className="flex h-72 flex-col gap-y-4 p-4">
              {!editor ? null : (
                <RichtextEditor className="flex-1" editor={editor} />
              )}
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <Switch id="mute-thread" />
                  <Label className="text-xs" htmlFor="mute-thread">
                    Mute this thread
                  </Label>
                </div>
                <Button size="sm">Send</Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Email
