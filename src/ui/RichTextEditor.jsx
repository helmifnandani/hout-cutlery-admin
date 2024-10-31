import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    BoldIcon,
    H1Icon,
    ItalicIcon,
    ListBulletIcon,
    NumberedListIcon,
} from '@heroicons/react/24/solid'

const MenuBar = ({ editor }) => {
    if (!editor) return null

    return (
        <div className="flex flex-wrap gap-2 border-b p-2">
            {/* Heading Styles - like different Job Stances */}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }}
                className={`rounded p-2 text-primary-600 hover:bg-gray-100 ${
                    editor.isActive('heading', { level: 1 })
                        ? 'bg-gray-200'
                        : ''
                }`}
            >
                <H1Icon className="size-5" />
            </button>

            {/* Text Styles - like Combat Actions */}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBold().run()
                }}
                className={`rounded p-2 text-primary-600 hover:bg-gray-100 ${
                    editor.isActive('bold') ? 'bg-gray-200' : ''
                }`}
            >
                <BoldIcon className="size-5" />
            </button>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleItalic().run()
                }}
                className={`rounded p-2 text-primary-600 hover:bg-gray-100 ${
                    editor.isActive('italic') ? 'bg-gray-200' : ''
                }`}
            >
                <ItalicIcon className="size-5" />
            </button>

            {/* Lists - like Combo Actions */}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBulletList().run()
                }}
                className={`rounded p-2 text-primary-600 hover:bg-gray-100 ${
                    editor.isActive('bulletList') ? 'bg-gray-200' : ''
                }`}
            >
                <ListBulletIcon className="size-5" />
            </button>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleOrderedList().run()
                }}
                className={`rounded p-2 text-primary-600 hover:bg-gray-100 ${
                    editor.isActive('orderedList') ? 'bg-gray-200' : ''
                }`}
            >
                <NumberedListIcon className="size-5" />
            </button>

            {/* Undo/Redo - like Battle Raise */}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().undo().run()
                }}
                disabled={!editor.can().undo()}
                className="rounded p-2 text-primary-600 hover:bg-gray-100 disabled:opacity-50"
            >
                <ArrowUturnLeftIcon className="size-5" />
            </button>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().redo().run()
                }}
                disabled={!editor.can().redo()}
                className="rounded p-2 text-primary-600 hover:bg-gray-100 disabled:opacity-50"
            >
                <ArrowUturnRightIcon className="size-5" />
            </button>
        </div>
    )
}

const RichTextEditor = ({ defaultValue, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: defaultValue,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange?.(html)
        },
    })

    useEffect(() => {
        if (editor && defaultValue !== editor.getHTML()) {
            editor.commands.setContent(defaultValue)
        }
    }, [defaultValue, editor])

    return (
        <div className="overflow-hidden rounded-lg border">
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="prose min-h-[200px] max-w-none p-4 outline-none ring-0 focus-within:outline-none focus-within:ring-0 focus:outline-none focus:ring-0"
            />
        </div>
    )
}

export default RichTextEditor
