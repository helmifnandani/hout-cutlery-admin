import { createContext, useContext, useEffect, useState } from 'react'
import { useModal } from '../ui/Modal'

const FileContext = createContext()

const FileProvider = ({ children }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [confirmedFile, setConfirmedFile] = useState(null)

    const selectFile = (file) => {
        if (selectedFile === file) {
            setSelectedFile(null)
            return
        }
        setSelectedFile(file)
    }

    const confirmSelection = () => {
        setConfirmedFile(selectedFile)
    }

    const resetFile = () => {
        setSelectedFile(null)
    }

    return (
        <FileContext.Provider
            value={{
                selectFile,
                selectedFile,
                setSelectedFile,
                resetFile,
                confirmSelection,
                confirmedFile,
                setConfirmedFile,
            }}
        >
            {children}
        </FileContext.Provider>
    )
}

function useFile() {
    const context = useContext(FileContext)
    if (context === undefined)
        throw new Error('FileContext was used outside of FileProvider')
    return context
}

export { FileProvider, useFile }
