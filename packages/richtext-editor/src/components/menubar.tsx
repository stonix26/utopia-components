/* eslint-disable no-nested-ternary -- TEMP */
import type { Editor } from '@tiptap/react'
import {
  Undo2,
  Redo2,
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
  RemoveFormatting,
  Text
} from 'lucide-react'
import { useCallback } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@utopia/dropdown-menu'
import Button from './button'

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

  const isEditable = editor.isEditable

  return (
    <div className="flex divide-x border-border p-0.5">
      <div className="flex gap-0.5 px-0.5">
        <Button
          disabled={!isEditable || !editor.can().chain().focus().undo().run()}
          icon={Undo2}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <Button
          disabled={!isEditable || !editor.can().chain().focus().redo().run()}
          icon={Redo2}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      <div className="flex gap-0.5 px-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              button_name={
                editor.isActive('heading', { level: 1 })
                  ? 'Heading 1'
                  : editor.isActive('heading', { level: 2 })
                  ? 'Heading 2'
                  : editor.isActive('heading', { level: 3 })
                  ? 'Heading 3'
                  : editor.isActive('heading', { level: 4 })
                  ? 'Heading 4'
                  : editor.isActive('heading', { level: 5 })
                  ? 'Heading 5'
                  : editor.isActive('heading', { level: 6 })
                  ? 'Heading 6'
                  : editor.isActive('bulletList')
                  ? 'Bullet List'
                  : editor.isActive('orderedList')
                  ? 'Numbered List'
                  : editor.isActive('blockquote')
                  ? 'Quote'
                  : editor.isActive('code')
                  ? 'Code'
                  : editor.isActive('codeBlock')
                  ? 'Code Block'
                  : editor.isActive('paragraph')
                  ? 'Normal'
                  : 'Normal'
              }
              disabled={!isEditable}
              icon={
                editor.isActive('heading', { level: 1 })
                  ? Heading1
                  : editor.isActive('heading', { level: 2 })
                  ? Heading2
                  : editor.isActive('heading', { level: 3 })
                  ? Heading3
                  : editor.isActive('heading', { level: 4 })
                  ? Heading4
                  : editor.isActive('heading', { level: 5 })
                  ? Heading5
                  : editor.isActive('heading', { level: 6 })
                  ? Heading6
                  : editor.isActive('bulletList')
                  ? List
                  : editor.isActive('orderedList')
                  ? ListOrdered
                  : editor.isActive('blockquote')
                  ? Quote
                  : editor.isActive('code')
                  ? Code
                  : editor.isActive('codeBlock')
                  ? SquareCode
                  : editor.isActive('paragraph')
                  ? Text
                  : Text
              }
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem
                disabled={
                  !isEditable ||
                  !editor.can().chain().focus().setParagraph().run()
                }
                onClick={() => editor.chain().focus().setParagraph().run()}
              >
                <Text className="mr-2 h-4 w-4" />
                <span>Normal</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <Heading1 className="mr-2 h-4 w-4" />
                <span>Heading 1</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2 className="mr-2 h-4 w-4" />
                <span>Heading 2</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Heading3 className="mr-2 h-4 w-4" />
                <span>Heading 3</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
              >
                <Heading4 className="mr-2 h-4 w-4" />
                <span>Heading 4</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
              >
                <Heading5 className="mr-2 h-4 w-4" />
                <span>Heading 5</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
              >
                <Heading6 className="mr-2 h-4 w-4" />
                <span>Heading 6</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="mr-2 h-4 w-4" />
                <span>Bullet List</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="mr-2 h-4 w-4" />
                <span>Numbered List</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className="mr-2 h-4 w-4" />
                <span>Quote</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <Code className="mr-2 h-4 w-4" />
                <span>Code</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <SquareCode className="mr-2 h-4 w-4" />
                <span>Code Block</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Button
          disabled={
            !isEditable || !editor.can().chain().focus().toggleBold().run()
          }
          icon={Bold}
          isActive={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <Button
          disabled={
            !isEditable || !editor.can().chain().focus().toggleItalic().run()
          }
          icon={Italic}
          isActive={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <Button
          disabled={
            !isEditable || !editor.can().chain().focus().toggleUnderline().run()
          }
          icon={Underline}
          isActive={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <Button
          disabled={
            !isEditable || !editor.can().chain().focus().toggleStrike().run()
          }
          icon={Strikethrough}
          isActive={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        {editor.getAttributes('link').href === undefined ? (
          <Button
            disabled={!isEditable}
            icon={Link}
            isActive={editor.isActive('link')}
            onClick={handleSetUnsetLink}
          />
        ) : (
          <Button
            disabled={!isEditable}
            icon={Unlink}
            isActive={editor.isActive('link')}
            onClick={() => editor.chain().focus().unsetLink().run()}
          />
        )}

        <Button disabled icon={Palette} />
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Button
          disabled={
            !isEditable ||
            !editor.can().chain().focus().toggleBulletList().run()
          }
          icon={List}
          isActive={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <Button
          disabled={
            !isEditable ||
            !editor.can().chain().focus().toggleOrderedList().run()
          }
          icon={ListOrdered}
          isActive={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <Button
          disabled={
            !isEditable ||
            !editor.can().chain().focus().setHorizontalRule().run()
          }
          icon={Minus}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <Button
          disabled={
            !isEditable || !editor.can().chain().focus().setHardBreak().run()
          }
          icon={WrapText}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        />
      </div>

      <div className="flex gap-0.5 px-0.5">
        <Button
          disabled={
            !isEditable || !editor.can().chain().focus().unsetAllMarks().run()
          }
          icon={Eraser}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        />
        <Button
          disabled={
            !isEditable || !editor.can().chain().focus().clearNodes().run()
          }
          icon={RemoveFormatting}
          onClick={() => editor.chain().focus().clearNodes().run()}
        />
        <Button
          disabled={
            !isEditable ||
            !editor.can().chain().setContent(editor.options.content, true)
          }
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
