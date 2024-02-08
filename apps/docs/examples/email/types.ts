import { LucideIcon } from 'lucide-react'

export interface SidebarTriggerProps {
  name: string
  icon: LucideIcon
  items?: number
  is_active?: boolean
}

export interface ISidebarData {
  primary: SidebarTriggerProps[]
  secondary: SidebarTriggerProps[]
}

export interface IUser {
  name: string
  value: string
  icon: LucideIcon
  email: string
}

export interface IInboxPreview {
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
