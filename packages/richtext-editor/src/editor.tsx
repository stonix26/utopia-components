import { forwardRef } from 'react'
import { EditorContent, type Editor as TiptapEditor } from '@tiptap/react'
import Menubar from './components/menubar'

export interface EditorProps {
  editor: TiptapEditor | null
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(function Editor(
  { editor },
  ref
) {
  return (
    <div className="divide-y rounded-sm border border-border" ref={ref}>
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
})

export default Editor
