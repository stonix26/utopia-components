import { forwardRef } from 'react'
import { EditorContent, type Editor as TiptapEditor } from '@tiptap/react'
import { ScrollArea } from '@utopia/radix-scroll-area'
import { cn } from '@utopia/classnames'
import Menubar from './components/menubar'

export interface EditorProps {
  editor: TiptapEditor | null
  className?: string
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(function Editor(
  { className, editor },
  ref
) {
  return (
    <ScrollArea
      className={cn('relative rounded-md border border-border', className)}
      ref={ref}
    >
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </ScrollArea>
  )
})

export default Editor
