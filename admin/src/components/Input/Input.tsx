import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Field } from '@strapi/design-system'
import { IconButton } from '@strapi/design-system'
import { Bold, Italic, StrikeThrough } from '@strapi/icons'

interface SingleLineEditorInputProps {
  name: string
  label?: string
  value: string
  labelAction?: React.ReactNode
  hint?: string | React.ReactNode
  description?: string | React.ReactNode
  required?: boolean
  error?: string
  onChange: (e: { target: { name: string; value: string; type: string } }) => void
  attribute: {
    options?: {
      toolbar?: boolean
    }
  }
}

const SingleLineEditorInput: React.FC<SingleLineEditorInputProps> = ({
  name,
  label,
  labelAction,
  value = '',
  hint,
  description,
  required,
  error,
  onChange,
  attribute,
}) => {
  const theme = localStorage.getItem('STRAPI_THEME') || 'light'
  const isDarkMode = theme === 'dark'

  const editor = useEditor({
    content: value || '',
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        hardBreak: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        paragraph: {},
      }),
    ],
    editorProps: {
      handleKeyDown: (_, event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          return true
        }
      },
      attributes: {
        class: 'editor-input',
        style: `
    border-radius: 4px;
    font-size: 1.4rem;
    line-heigh: 2.2rem;
    padding-inline-start: 16px;
    padding-inline-end: 16px;
    padding-block: 8px;
    outline: none;
  `,
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML()

      onChange({
        target: {
          name,
          value: html,
          type: 'text',
        },
      })
    },
  })

  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  return (
    <Field.Root
      error={error}
      name={name}
      id={name}
      hint={hint}
      description={description}
      required={required}
    >
      {label && (
        <Field.Label action={labelAction}>
          {label}
          {labelAction && <span style={{ marginLeft: '8px' }}>{labelAction}</span>}
        </Field.Label>
      )}

      <div
        style={{
          borderRadius: '4px',
          background: isDarkMode ? '#212134' : 'rgb(255, 255, 255)',
          border: `1px solid ${isDarkMode ? '#4a4a6a' : 'rgb(220, 220, 228)'}`,
        }}
      >
        {attribute.options?.toolbar && (
          <div
            style={{
              paddingBlockStart: '8px',
              paddingInlineEnd: '8px',
              paddingBlockEnd: '8px',
              paddingInlineStart: '8px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '4px',
              borderBottom: `1px solid ${isDarkMode ? '#4a4a6a' : 'rgb(220, 220, 228)'}`
            }}
          >
            <IconButton
              onClick={() => editor?.chain().focus().toggleBold().run()}
              variant={editor?.isActive('bold') ? 'secondary' : 'ghost'}
              style={{ border: 'none' }}
            >
              <Bold />
            </IconButton>

            <IconButton
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              variant={editor?.isActive('italic') ? 'secondary' : 'ghost'}
              style={{ border: 'none' }}
            >
              <Italic />
            </IconButton>

            <IconButton
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              variant={editor?.isActive('strike') ? 'secondary' : 'ghost'}
              style={{ border: 'none' }}
            >
              <StrikeThrough />
            </IconButton>
          </div>
        )}

        <EditorContent editor={editor} />
      </div>

      <Field.Hint />
      <Field.Error />
    </Field.Root>
  )
}

export default SingleLineEditorInput
