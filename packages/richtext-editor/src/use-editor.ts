/* eslint-disable @typescript-eslint/no-explicit-any -- TEMPORARY FIX */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- TEMPORARY FIX */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- TEMPORARY FIX */
/* eslint-disable @typescript-eslint/no-unsafe-call -- TEMPORARY FIX */
/* eslint-disable @typescript-eslint/no-unsafe-return -- TEMPORARY FIX */
import type { DependencyList } from 'react'
import tippy from 'tippy.js'
import {
  type Editor,
  type EditorOptions,
  useEditor as useTiptapEditor,
  ReactRenderer
} from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Link } from '@tiptap/extension-link'
import { Underline } from '@tiptap/extension-underline'
import { FontFamily } from '@tiptap/extension-font-family'
import { TextAlign } from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { ListItem } from '@tiptap/extension-list-item'
import { Mention } from '@tiptap/extension-mention'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { FontSize } from './plugins/font-size'
import { MentionList } from './mention-list'

interface ExtendedEditorOptions extends EditorOptions {
  mentionList: string[]
}

type UseEditorType = (
  options: Partial<ExtendedEditorOptions>,
  deps?: DependencyList
) => Editor | null

// TODO - make this a separate classes
const mentionsCls = {
  chip: 'border border-secondary-darker rounded box-decoration-clone px-1 py-0.5 bg-white',
  itemContainer: 'relative bg-white drop-shadow-xl overflow-hidden p-2',
  item: {
    base: 'bg-transparent border border-transparent rounded block px-2 py-1 text-base text-left w-full',
    isSelected: 'border-secondary-darker'
  }
}

const useEditor: UseEditorType = (
  {
    editable = true,
    mentionList = [],
    editorProps,
    injectCSS = false,
    autofocus = false,
    ...otherOptions
  },
  deps
) => {
  const baseEditorHook = useTiptapEditor(
    {
      extensions: [
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
          }
        }),
        Link.configure({
          openOnClick: false,
          protocols: [
            'ftp',
            'mailto',
            { scheme: 'tel', optionalSlashes: true }
          ],
          // 👇 only autolink urls with a protocol
          validate: href => /^https?:\/\//.test(href)
        }),
        Underline,
        FontFamily,
        FontSize,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle,
        Mention.configure({
          HTMLAttributes: {
            class: mentionsCls.chip
          },
          suggestion: {
            items: ({ query }) => {
              return mentionList.filter(item =>
                item.toLowerCase().startsWith(query.toLowerCase())
              )
            },
            render: () => {
              let component: any
              let popup: any

              return {
                onStart: props => {
                  component = new ReactRenderer(MentionList, {
                    props,
                    editor: props.editor
                  })

                  if (!props.clientRect) {
                    return
                  }

                  // @ts-expect-error -- TODO
                  popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start'
                  })
                },

                onUpdate(props) {
                  component.updateProps(props)

                  if (!props.clientRect) {
                    return
                  }

                  popup[0].setProps({
                    getReferenceClientRect: props.clientRect
                  })
                },

                onKeyDown(props) {
                  if (props.event.key === 'Escape') {
                    popup[0].hide()

                    return true
                  }

                  return component.ref?.onKeyDown(props)
                },

                onExit() {
                  popup[0].destroy()
                  component.destroy()
                }
              }
            }
          }
        }),
        Image,
        Table.configure({
          resizable: true,
          HTMLAttributes: { class: 'utopia-rte-table' }
        }),
        TableRow,
        TableHeader,
        TableCell
      ],
      editable,
      editorProps: {
        attributes: {
          class: 'prose prose-utopia',
          ...editorProps?.attributes
        },
        ...editorProps
      },
      injectCSS,

      // 👇 https://github.com/ueberdosis/tiptap/issues/1716
      autofocus,
      ...otherOptions
    },
    deps
  )

  return baseEditorHook
}

export { useEditor, type UseEditorType, type ExtendedEditorOptions }
