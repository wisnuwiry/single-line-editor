import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Field } from '@strapi/design-system'

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
}) => {
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
        style: 'padding: 8px 12px; border: 1px solid #dcdce4; border-radius: 4px; font-size: 14px',
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
        <Field.Label
          action={labelAction}
          style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 600,
            color: '#32324d',
            marginBottom: '4px',
          }}
        >
          {label}
          {labelAction && <span style={{ marginLeft: '8px' }}>{labelAction}</span>}
        </Field.Label>
      )}

      <EditorContent editor={editor} />

      <Field.Hint />
      <Field.Error />
    </Field.Root>
  )
}

export default SingleLineEditorInput
