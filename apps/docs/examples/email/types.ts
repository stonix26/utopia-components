import type { LucideIcon } from 'lucide-react'

export interface SidebarTriggerProps {
  name: string
  icon: LucideIcon
  items?: number
  is_active?: boolean
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
  sender: string
  read: boolean
  date_sent: string
  title: string
  content: string
  tags: {
    name: string
    variant?: 'default' | 'secondary'
  }[]
}
