import { forwardRef } from 'react'
import { EditorContent, type Editor as TiptapEditor } from '@tiptap/react'

export interface EditorProps {
  editor: TiptapEditor | null
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  function Editor(props, ref) {
    return (
      <div ref={ref}>
        <EditorContent editor={props.editor} />
      </div>
    )
  }
)

export default Editor
