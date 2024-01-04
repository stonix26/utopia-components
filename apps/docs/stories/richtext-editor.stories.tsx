import type { Meta } from '@storybook/react'
import { Button } from '@utopia/button'
import { RichtextEditor, useEditor } from '@utopia/richtext-editor'

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

  if (!editor) {
    return null
  }

  // eslint-disable-next-line no-console -- logger
  console.log(editor.getJSON())

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
    </div>
  )
}
