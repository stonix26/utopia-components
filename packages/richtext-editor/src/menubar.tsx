import type { Editor } from '@tiptap/react'
import { Button } from '@utopia/button'
import { Undo2, Redo2 } from 'lucide-react'

export interface MenubarProps {
  editor: Editor | null
}

function Menubar({ editor }: MenubarProps): JSX.Element | null {
  if (!editor) {
    return null
  }
  return (
    <div className="flex gap-0.5">
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        size="xs"
        variant="ghost"
      >
        <Undo2 className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        size="xs"
        variant="ghost"
      >
        <Redo2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default Menubar
