import { useContext } from 'react'
import { MailContext, type MailContextInterface } from './provider'

export const useMail = (): MailContextInterface => {
  const data = useContext(MailContext)

  if (!data) {
    throw new Error('useMail must be used within a mail Provider')
  }

  return data
}
