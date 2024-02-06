import { Button } from '@utopia/button'
import { AirVentIcon } from 'lucide-react'
import { cn } from '@utopia/classnames'

function App() {
  return (
    <>
      <div className="bg-slate-200">
        <h1 className={cn('text-orange-500', { 'bg-black': true })}>
          Hello Email
        </h1>
        <Button type="button" size="lg">
          Hello
          <AirVentIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}

export default App
