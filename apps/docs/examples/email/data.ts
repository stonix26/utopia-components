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
    date_sent: '4 months ago',
    title: 'Meeting tomorrow',
    content: `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.
    Please come prepared with any questions or insights you may have. Looking forward to our meeting!
    Best regards, William`,
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
    date_sent: '4 months ago',
    title: 'Re: Project Update',
    content: `Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.

    I have a few minor suggestions that I'll include in the attached document.
    
    Let's discuss these during our next meeting. Keep up the excellent work!
    
    Best regards, Alice`,
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
    date_sent: '10 months ago',
    title: 'Weekend Plans',
    content: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.

    If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.
    
    Looking forward to your response!
    
    Best, Bob`,
    tags: [
      {
        name: 'personal',
        variant: 'secondary'
      }
    ]
  },

  {
    id: '4',
    sender: 'William Smith',
    read: true,
    date_sent: '4 months ago',
    title: 'Meeting tomorrow',
    content: `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.
    Please come prepared with any questions or insights you may have. Looking forward to our meeting!
    Best regards, William`,
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
    id: '5',
    sender: 'Alice Smith',
    read: true,
    date_sent: '4 months ago',
    title: 'Re: Project Update',
    content: `Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.

    I have a few minor suggestions that I'll include in the attached document.
    
    Let's discuss these during our next meeting. Keep up the excellent work!
    
    Best regards, Alice`,
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
    id: '6',
    sender: 'Bob Johnson',
    read: true,
    date_sent: '10 months ago',
    title: 'Weekend Plans',
    content: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.

    If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.
    
    Looking forward to your response!
    
    Best, Bob`,
    tags: [
      {
        name: 'personal',
        variant: 'secondary'
      }
    ]
  },
  {
    id: '7',
    sender: 'William Smith',
    read: true,
    date_sent: '4 months ago',
    title: 'Meeting tomorrow',
    content: `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.
    Please come prepared with any questions or insights you may have. Looking forward to our meeting!
    Best regards, William`,
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
    id: '8',
    sender: 'Alice Smith',
    read: false,
    date_sent: '4 months ago',
    title: 'Re: Project Update',
    content: `Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.

    I have a few minor suggestions that I'll include in the attached document.
    
    Let's discuss these during our next meeting. Keep up the excellent work!
    
    Best regards, Alice`,
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
    id: '9',
    sender: 'Bob Johnson',
    read: false,
    date_sent: '10 months ago',
    title: 'Weekend Plans',
    content: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.

    If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.
    
    Looking forward to your response!
    
    Best, Bob`,
    tags: [
      {
        name: 'personal',
        variant: 'secondary'
      }
    ]
  },

  {
    id: '10',
    sender: 'William Smith',
    read: true,
    date_sent: '4 months ago',
    title: 'Meeting tomorrow',
    content: `Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.
    Please come prepared with any questions or insights you may have. Looking forward to our meeting!
    Best regards, William`,
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
    id: '11',
    sender: 'Alice Smith',
    read: true,
    date_sent: '4 months ago',
    title: 'Re: Project Update',
    content: `Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.

    I have a few minor suggestions that I'll include in the attached document.
    
    Let's discuss these during our next meeting. Keep up the excellent work!
    
    Best regards, Alice`,
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
    id: '12',
    sender: 'Bob Johnson',
    read: true,
    date_sent: '10 months ago',
    title: 'Weekend Plans',
    content: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.

    If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.
    
    Looking forward to your response!
    
    Best, Bob`,
    tags: [
      {
        name: 'personal',
        variant: 'secondary'
      }
    ]
  }
]
