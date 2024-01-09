/* eslint-disable no-nested-ternary -- TEMP */
import type { Editor } from '@tiptap/react'
import {
  Undo2,
  Redo2,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
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
  RotateCcw,
  Unlink,
  RemoveFormatting
} from 'lucide-react'
import { useCallback } from 'react'
import Combobox, { type ComboboxProps } from './combobox'
import Button from './button'

const textStyles: ComboboxProps['trigger'][] = [
  {
    name: 'Paragraph',
    icon: Pilcrow
  },
  {
    name: 'Heading 1',
    icon: Heading1
  },
  {
    name: 'Heading 2',
    icon: Heading2
  },
  {
    name: 'Heading 3',
    icon: Heading3
  },
  {
    name: 'Heading 4',
    icon: Heading4
  },
  {
    name: 'Heading 5',
    icon: Heading5
  },
  {
    name: 'Heading 6',
    icon: Heading6
  },
  {
    name: 'Bullet List',
    icon: List
  },
  {
    name: 'Numbered List',
    icon: ListOrdered
  },
  {
    name: 'Quote',
    icon: Quote
  }
]

export interface MenubarProps {
  editor: Editor | null
}

function Menubar({ editor }: MenubarProps): JSX.Element | null {
  const handleSetUnsetLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href as string
    // eslint-disable-next-line no-alert -- temp
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) return

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex divide-x border-border p-0.5">
      <div className="flex gap-0.5 px-0.5">
        <Button
          icon={Undo2}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <Button
          icon={Redo2}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Combobox
          emptyText="Styles not found."
          items={[
            {
              name: 'group-1',
              items: textStyles.map(s => {
                return {
                  name: s.name,
                  icon: s.icon,
                  value: s.name,
                  onSelect: v => {
                    switch (v) {
                      case 'paragraph':
                        editor.chain().focus().setParagraph().run()
                        break
                      case 'heading 1':
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                        break
                      case 'heading 2':
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                        break
                      case 'heading 3':
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                        break
                      case 'heading 4':
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                        break
                      case 'heading 5':
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                        break
                      case 'heading 6':
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                        break
                      case 'bullet list':
                        editor.chain().focus().toggleBulletList().run()
                        break
                      case 'numbered list':
                        editor.chain().focus().toggleOrderedList().run()
                        break
                      case 'quote':
                        editor.chain().focus().toggleBlockquote().run()
                        break
                      default:
                        editor.chain().focus().setParagraph().run()
                    }
                  }
                }
              })
            }
          ]}
          placeholder="Search styles..."
          trigger={
            editor.isActive('paragraph')
              ? textStyles[0]
              : editor.isActive('heading', { level: 1 })
              ? textStyles[1]
              : editor.isActive('heading', { level: 2 })
              ? textStyles[2]
              : editor.isActive('heading', { level: 3 })
              ? textStyles[3]
              : editor.isActive('heading', { level: 4 })
              ? textStyles[4]
              : editor.isActive('heading', { level: 5 })
              ? textStyles[5]
              : editor.isActive('heading', { level: 6 })
              ? textStyles[6]
              : editor.isActive('bulletList')
              ? textStyles[7]
              : editor.isActive('orderedList')
              ? textStyles[8]
              : editor.isActive('blockquote')
              ? textStyles[9]
              : textStyles[0]
          }
        />
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Button
          disabled={!editor.isEditable}
          icon={Bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <Button
          icon={Italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <Button
          icon={Underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <Button
          icon={Code}
          onClick={() => editor.chain().focus().toggleCode().run()}
        />
        <Button
          icon={Strikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        {editor.getAttributes('link').href === undefined ? (
          <Button icon={Link} onClick={handleSetUnsetLink} />
        ) : (
          <Button
            icon={Unlink}
            onClick={() => editor.chain().focus().unsetLink().run()}
          />
        )}

        <Button icon={Palette} />
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Button
          icon={List}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <Button
          icon={ListOrdered}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <Button
          icon={SquareCode}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <Button
          icon={Quote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <Button
          icon={Minus}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <Button
          icon={WrapText}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        />
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Button
          icon={Eraser}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        />
        <Button
          icon={RemoveFormatting}
          onClick={() => editor.chain().focus().clearNodes().run()}
        />
        <Button
          icon={RotateCcw}
          onClick={() =>
            editor.commands.setContent(editor.options.content, true)
          }
        />
      </div>
    </div>
  )
}

export default Menubar
