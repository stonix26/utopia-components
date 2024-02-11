import type { MouseEventHandler, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface SidebarTriggerProps {
  name: string
  icon: LucideIcon
  items?: number
  is_active?: boolean
}

export interface TabsContentProps {
  value: string
  children: ReactNode
}

export interface SidebarDataInterface {
  primary: SidebarTriggerProps[]
  secondary: SidebarTriggerProps[]
}

export interface UserInterface {
  name: string
  value: string
  icon: LucideIcon
  email: string
}

export interface InboxPreviewInterface {
  id: string
  avatar_src?: string
  sender: string
  read: boolean
  date_sent: string
  title: string
  reply_to: string
  content: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  tags: {
    name: string
    variant?: 'default' | 'secondary'
  }[]
}
