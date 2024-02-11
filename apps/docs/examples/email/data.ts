import {
  Inbox,
  File,
  Send,
  ArchiveX,
  Trash2,
  Archive,
  Users2,
  AlertCircle,
  MessageSquare,
  ShoppingCart,
  Podcast,
  Slack,
  Twitch
} from 'lucide-react'
import type {
  SidebarDataInterface,
  UserInterface,
  InboxPreviewInterface
} from './types'

export const SIDEBAR_DATA: SidebarDataInterface = {
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

export const USER_SELECT: UserInterface[] = [
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

export const INBOX_DATA: InboxPreviewInterface[] = [
  {
    id: '1',
    sender: 'William Smith',
    read: true,
    date_sent: '2023-10-22T08:30:00',
    title: 'Meeting tomorrow',
    reply_to: 'williamsmith@example.com',
    content: `<p>Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.</p><p></p><p>    Please come prepared with any questions or insights you may have. Looking forward to our meeting!</p><p></p><p></p><p></p><p>    Best regards, William</p>`,
    tags: [
      {
        name: 'meeting',
        variant: 'secondary'
      },
      {
        name: 'work',
        variant: 'default'
      },
      {
        name: 'important',
        variant: 'secondary'
      }
    ]
  },
  {
    id: '2',
    sender: 'Alice Smith',
    read: false,
    date_sent: '2023-12-21T08:30:00',
    title: 'Re: Project Update',
    reply_to: 'alicesmith@example.com',
    content: `<p>Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive.</p><p>The team has done a fantastic job, and I appreciate the hard work everyone has put in.</p><p></p><p>I have a few minor suggestions that I'll include in the attached document. Let's discuss these during our next meeting.</p><p></p><p>Keep up the excellent work!</p><p></p><p></p><p>Best regards,</p><p>Alice</p>`,
    tags: [
      {
        name: 'work',
        variant: 'default'
      },
      {
        name: 'important',
        variant: 'secondary'
      }
    ]
  },
  {
    id: '3',
    sender: 'Bob Johnson',
    read: false,
    date_sent: '2023-01-14T08:30:00',
    title: 'Weekend Plans',
    reply_to: 'bobjohnson@example.com',
    content: `<p>Any plans for the weekend?</p><p>I was thinking of going hiking in the nearby mountains.</p><p>It's been a while since we had some outdoor fun.</p><p></p><p>If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.</p><p></p><p>Looking forward to your response!</p><p></p><p></p><p>Best,</p><p>Bob</p>`,
    tags: [
      {
        name: 'personal',
        variant: 'secondary'
      }
    ]
  }
]
