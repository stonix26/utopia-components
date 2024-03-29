import type { Meta } from '@storybook/react'
import { Button } from '@utopia/radix-button'
import { RichtextEditor, useEditor } from '@utopia/richtext-editor'
import { ScrollArea } from '@utopia/radix-scroll-area'
import { CheckSquare, Copy } from 'lucide-react'
import { Switch } from '@utopia/radix-switch'
import { Label } from '@utopia/radix-label'
import { useState } from 'react'
import { useCopyToClipboard } from '../../utils/hooks/use-copy-to-clipboard'

const meta: Meta<typeof RichtextEditor> = {
  component: RichtextEditor
}

export default meta

const content = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { textAlign: 'left', level: 2 },
      content: [{ type: 'text', text: 'Hi there,' }]
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [
        { type: 'text', text: 'this is a ' },
        { type: 'text', marks: [{ type: 'italic' }], text: 'basic' },
        { type: 'text', text: ' example of ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'tiptap' },
        {
          type: 'text',
          text: '. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:'
        }
      ]
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          attrs: { color: '' },
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'left' },
              content: [
                { type: 'text', text: 'That’s a bullet list with one …' }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          attrs: { color: '' },
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'left' },
              content: [{ type: 'text', text: '… or two list items.' }]
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [
        {
          type: 'text',
          text: 'Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:'
        }
      ]
    },
    {
      type: 'codeBlock',
      attrs: { language: 'css' },
      content: [{ type: 'text', text: 'body {\ndisplay: none;\n}' }]
    },
    {
      type: 'paragraph',
      attrs: { textAlign: 'left' },
      content: [
        {
          type: 'text',
          text: 'I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.'
        }
      ]
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          attrs: { textAlign: 'left' },
          content: [
            { type: 'text', text: 'Wow, that’s amazing. Good work, boy! 👏 ' },
            { type: 'hardBreak' },
            { type: 'text', text: '— Mom' }
          ]
        }
      ]
    }
  ]
}

const mentionList = ['Ruston', 'Jizza', 'Meco']

export function Default(): JSX.Element | null {
  const editor = useEditor({ editable: true, content, mentionList })

  if (!editor) {
    return null
  }

  return <RichtextEditor editor={editor} />
}

const newContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { textAlign: 'left', level: 2 },
      content: [{ type: 'text', text: 'New content 👏🤩' }]
    }
  ]
}

export function Controlled(): JSX.Element | null {
  const editor = useEditor({ editable: true, content, mentionList })
  const [value, copy] = useCopyToClipboard()
  const [checked, setChecked] = useState(false)

  if (!editor) {
    return null
  }

  const JSON_STATE = JSON.stringify(editor.getJSON(), null, 2)
  const HTML_STATE = editor.getHTML()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button onClick={() => editor.commands.setContent(newContent)}>
          Click to set new editor content
        </Button>
        <Button
          onClick={() => {
            editor.setEditable(!editor.isEditable, true)
            editor.chain().focus()
          }}
        >
          Toggle Editable
        </Button>
      </div>
      <RichtextEditor editor={editor} />
      <div className="divide-y rounded border">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <Switch
              checked={checked}
              id="state-format"
              onCheckedChange={() => {
                setChecked(prev => !prev)
              }}
            />
            <Label htmlFor="state-format">{checked ? 'HTML' : 'JSON'}</Label>
          </div>
          <button
            onClick={() => copy(checked ? HTML_STATE : JSON_STATE)}
            type="button"
          >
            {value ? (
              <CheckSquare className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <ScrollArea className="h-96 w-full">
          <pre className="block h-full w-full p-3 text-xs">
            {checked ? (
              <code className="html" lang="html">
                {HTML_STATE}
              </code>
            ) : (
              <code className="language-json" lang="json">
                {JSON_STATE}
              </code>
            )}
          </pre>
        </ScrollArea>
      </div>
    </div>
  )
}

export function SlateTheme(): JSX.Element | null {
  const editor = useEditor({
    editable: true,
    content,
    mentionList,
    editorProps: { attributes: { class: 'prose prose-utopia prose-slate' } }
  })

  if (!editor) {
    return null
  }

  return <RichtextEditor editor={editor} />
}

export function ZincTheme(): JSX.Element | null {
  const editor = useEditor({
    editable: true,
    content,
    mentionList,
    editorProps: { attributes: { class: 'prose prose-utopia prose-zinc' } }
  })

  if (!editor) {
    return null
  }

  return <RichtextEditor editor={editor} />
}

export function NeutralTheme(): JSX.Element | null {
  const editor = useEditor({
    editable: true,
    content,
    mentionList,
    editorProps: { attributes: { class: 'prose prose-utopia prose-neutral' } }
  })

  if (!editor) {
    return null
  }

  return <RichtextEditor editor={editor} />
}

export function StoneTheme(): JSX.Element | null {
  const editor = useEditor({
    editable: true,
    content,
    mentionList,
    editorProps: { attributes: { class: 'prose prose-utopia prose-stone' } }
  })

  if (!editor) {
    return null
  }

  return <RichtextEditor editor={editor} />
}

export function CustomTheme(): JSX.Element | null {
  const editor = useEditor({
    editable: true,
    content,
    mentionList,
    editorProps: { attributes: { class: 'prose prose-utopia prose-pink' } }
  })

  if (!editor) {
    return null
  }

  return <RichtextEditor editor={editor} />
}
