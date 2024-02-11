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
  MessageSquare,
  MicOff,
  MoreVertical,
  Reply,
  ReplyAll,
  Star,
  Tag,
  Trash2
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@utopia/avatar'
import { Switch } from '@utopia/switch'
import { Label } from '@utopia/label'
import { RichtextEditor, useEditor } from '@utopia/richtext-editor'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@utopia/dropdown-menu'
import { formatDate } from '../../utils/dates'
import { getInitials } from '../../utils/strings'
import { USER_SELECT, SIDEBAR_DATA } from './data'
import { MailPreviewCard, SidebarTrigger, TabsContent } from './components'
import ButtonIcon from './components/button-icon'
import { useMail } from './hooks'

function EmailView(): React.JSX.Element {
  const { state, actions } = useMail()
  const [user, setUser] = useState(USER_SELECT[0].value)
  const userIndex = USER_SELECT.findIndex(e => e.value === user)
  const UserIcon = USER_SELECT[userIndex].icon

  const editor = useEditor({ editable: true })

  return (
    <div className="flex h-full max-h-[calc(100vh-2rem)] w-full flex-col border shadow-lg">
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
              {state.inbox?.map(i => (
                <MailPreviewCard
                  key={i.id}
                  onClick={() => {
                    actions.onMailCardClick(i.id)
                  }}
                  {...i}
                />
              ))}
            </TabsContent>
            <TabsContent value="unread">
              {state.inbox
                ?.filter(i => !i.read)
                .map(k => (
                  <MailPreviewCard
                    key={k.id}
                    onClick={() => {
                      actions.onMailCardClick(k.id)
                    }}
                    {...k}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={55} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="flex h-fit flex-wrap justify-between px-1.5 py-2">
              <div className="flex gap-x-2">
                <ButtonIcon icon={Archive} tooltip="Archive" />
                <ButtonIcon icon={ArchiveX} tooltip="Move to junk" />
                <ButtonIcon icon={Trash2} tooltip="Move to trash" />
                <Separator decorative orientation="vertical" />
                <ButtonIcon icon={Clock} tooltip="Snooze" />
              </div>
              <div className="flex gap-x-2">
                <ButtonIcon icon={Reply} tooltip="Reply" />
                <ButtonIcon icon={ReplyAll} tooltip="Reply all" />
                <ButtonIcon icon={Forward} tooltip="Forward" />
                <Separator decorative orientation="vertical" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ButtonIcon icon={MoreVertical} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Mark as unread</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="mr-2 h-4 w-4" />
                      <span>Star thread</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="mr-2 h-4 w-4" />
                      <span>Add label</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MicOff className="mr-2 h-4 w-4" />
                      <span>Mute thread</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Separator decorative />
            <div className="flex flex-1 flex-col divide-y border-b">
              <div className="flex h-fit gap-x-4 p-4">
                <Avatar>
                  <AvatarImage
                    alt={`Avatar image of ${state.threadDisplay?.sender}`}
                    src={state.threadDisplay?.avatar_src}
                  />
                  <AvatarFallback>
                    {getInitials(state.threadDisplay?.sender ?? 'NA')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="inline-flex w-full items-center justify-between font-semibold">
                    <span className="line-clamp-2">
                      {state.threadDisplay?.sender}
                    </span>
                    <span className="line-clamp-3 text-xs font-normal text-muted-foreground">
                      {state.threadDisplay?.date_sent
                        ? formatDate(state.threadDisplay.date_sent)
                        : null}
                    </span>
                  </p>
                  <p className="line-clamp-1 text-xs">
                    {state.threadDisplay?.title}
                  </p>
                  <p className="line-clamp-1 text-xs">
                    Reply-To: {state.threadDisplay?.reply_to}
                  </p>
                </div>
              </div>
              <div className="flex-1 p-4">
                <div
                  className="prose text-sm"
                  dangerouslySetInnerHTML={{
                    __html: state.threadDisplay?.content ?? ''
                  }}
                />
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

export default EmailView
