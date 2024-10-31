import { cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { XMarkIcon } from '@heroicons/react/24/solid'

// 1. Create a context
const ModalContext = createContext()

// 2. Create parent component
const Modal = ({ children }) => {
    const [openName, setOpenName] = useState('')

    const close = () => {
        setOpenName('')
    }
    const open = setOpenName

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    )
}

// 3. Create child components to help implementing the common task
const Open = ({ children, opens: opensWindowName }) => {
    const { open } = useContext(ModalContext)

    return cloneElement(children, {
        onClick: (e) => {
            e.preventDefault()
            open(opensWindowName)
        },
    })
}

const Window = ({ children, name }) => {
    const { openName, close } = useContext(ModalContext)
    const ref = useOutsideClick(close)

    if (name !== openName) return null
    return createPortal(
        <div className="fixed left-0 top-0 z-[9999] h-screen w-full backdrop-blur-sm backdrop-brightness-50 transition-all duration-500">
            <div
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-accent-background px-10 py-8 shadow-lg transition-all duration-300"
                ref={ref}
            >
                <button
                    className="absolute right-5 top-3 translate-x-2 rounded-sm border-none bg-none p-1 transition-all duration-200 hover:bg-primary-300"
                    onClick={close}
                >
                    <XMarkIcon className="size-6 text-primary-600" />
                </button>

                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </div>
        </div>,
        document.body
    )
}

// 4. Add child components as properties to parent component
Modal.Open = Open
Modal.Window = Window

export default Modal

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within ModalProvider')
    }
    return context
}
