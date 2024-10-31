import React, { useEffect, useState } from 'react'
import { PAGE_FILE_SIZE } from '../utils/constants'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Button from './Button'
import { useFile } from '../context/FileContext'
import { useModal } from './Modal'

const SelectFile = ({ list }) => {
    const [listItems, setListItems] = useState(list.slice(0, PAGE_FILE_SIZE))
    const [page, setPage] = useState(1)
    const {
        selectFile,
        selectedFile,
        setSelectedFile,
        resetFile,
        confirmSelection,
        confirmedFile,
    } = useFile()
    const { openName, close } = useModal()

    useEffect(() => {
        setListItems(
            list.slice((page - 1) * PAGE_FILE_SIZE, page * PAGE_FILE_SIZE)
        )
    }, [page, list])

    const pageCount = Math.ceil(list.length / PAGE_FILE_SIZE)

    const nextPage = () => {
        setPage((page) => (page === pageCount ? page : page + 1))
    }

    const previousPage = () => {
        setPage((page) => (page === 1 ? page : page - 1))
    }

    const handleSelect = (file) => {
        selectFile(file)
    }

    const handleCancel = () => {
        resetFile()
        close()
    }

    const handleConfirm = () => {
        confirmSelection()
        resetFile()
        close()
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {listItems.map((item) => {
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className={`${selectedFile && selectedFile.id === item.id ? 'rounded-lg border-2 border-primary-600' : ''} aspect-card h-44 rounded-lg transition-all`}
                        >
                            <img
                                className="aspect-card object-cover"
                                src={item.url}
                                alt={item.name}
                            />
                        </button>
                    )
                })}
            </div>

            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center justify-center gap-1 rounded-md py-2 pl-1 pr-3 transition-all duration-300 hover:bg-primary-600 hover:text-primary-100 disabled:text-gray-400 disabled:hover:bg-primary-100"
                        onClick={previousPage}
                        disabled={page === 1}
                    >
                        <ChevronLeftIcon className="size-5" />
                        <span>Previous</span>
                    </button>
                    <p>
                        <span className="font-semibold">{page}</span> of{' '}
                        <span className="font-semibold">{pageCount}</span>
                    </p>
                    <button
                        className="flex items-center justify-center gap-1 rounded-md py-2 pl-3 pr-1 transition-all duration-300 hover:bg-primary-600 hover:text-primary-100 disabled:text-gray-400 disabled:hover:bg-primary-100"
                        onClick={nextPage}
                        disabled={page === pageCount}
                    >
                        <span>Next</span>
                        <ChevronRightIcon className="size-5" />
                    </button>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Button
                        size={'small'}
                        variant="secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button size={'small'} onClick={handleConfirm}>
                        Select
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SelectFile
