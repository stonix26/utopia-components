import { Mail } from './components/mail'
import { accounts, mails } from './data'

function App() {
  return (
    <Mail
      accounts={accounts}
      mails={mails}
      defaultLayout={[265, 440, 655]}
      defaultCollapsed={false}
      navCollapsedSize={4}
    />
  )
}

export default App
