import type { Editor } from '@tiptap/react'
import { Button } from '@utopia/button'
import {
  Undo2,
  Redo2,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  Code,
  Strikethrough,
  Link,
  Palette,
  List,
  ListOrdered,
  SquareCode,
  Quote,
  Minus,
  WrapText,
  Eraser,
  BookCheck,
  RotateCcw
} from 'lucide-react'

export interface MenubarProps {
  editor: Editor | null
}

function Menubar({ editor }: MenubarProps): JSX.Element | null {
  if (!editor) {
    return null
  }
  return (
    <div className="flex divide-x border-border p-0.5">
      <div className="flex gap-0.5 px-0.5">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          size="xs"
          variant="ghost"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          size="xs"
          variant="ghost"
        >
          <Pilcrow className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          size="xs"
          variant="ghost"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Palette className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <SquareCode className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <WrapText className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <BookCheck className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          size="xs"
          variant="ghost"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Menubar
