/* eslint-disable no-console -- Temp */
import React, {
  type ReactNode,
  createContext,
  useEffect,
  useState
} from 'react'
import type { InboxPreviewInterface } from './types'
import { INBOX_DATA } from './data'

export interface MailContextInterface {
  state: {
    inbox?: InboxPreviewInterface[]
    threadDisplay: InboxPreviewInterface | undefined
  }
  actions: {
    onMailCardClick: (id: string) => void
  }
}

export const MailContext = createContext<MailContextInterface | null>(null)

function Provider({ children }: { children: ReactNode }): React.JSX.Element {
  const [inbox, setInbox] = useState<InboxPreviewInterface[] | undefined>(
    undefined
  )
  const [threadDisplay, setThreadDisplay] = useState<
    InboxPreviewInterface | undefined
  >(undefined)

  useEffect(() => {
    // const fetchData = async (): Promise<void> => {
    //   try {
    //     const response = await fetch('https://') // call for an api here
    //     const result = (await response.json()) as InboxPreviewInterface[]
    //     setInbox(result)
    //   } catch (error) {
    //     console.error('Error fetching data: ', error)
    //   }
    // }

    // fetchData().catch(error => {
    //   console.error('Error fetching data: ', error)
    // })
    setInbox(INBOX_DATA)
  }, [])

  useEffect(() => {
    if (!inbox) return
    setThreadDisplay(inbox[0])
  }, [inbox])

  const onMailCardClick = (id: string): void => {
    if (!inbox) return
    const card = inbox.find(c => c.id === id)
    setThreadDisplay(card)
  }

  const state = { inbox, threadDisplay }
  const actions = { onMailCardClick }

  console.log('email state: ', state)
  console.log('threadDisplay', threadDisplay)
  return (
    <MailContext.Provider value={{ state, actions }}>
      {children}
    </MailContext.Provider>
  )
}

export default Provider
