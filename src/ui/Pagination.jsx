import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../utils/constants'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const Pagination = ({ count }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'))
    const pageCount = Math.ceil(count / PAGE_SIZE)

    const nextPage = () => {
        const next = currentPage === pageCount ? currentPage : currentPage + 1
        searchParams.set('page', next)
        setSearchParams(searchParams)
    }

    const previousPage = () => {
        const prev = currentPage === 1 ? currentPage : currentPage - 1
        searchParams.set('page', prev)
        setSearchParams(searchParams)
    }

    if (pageCount <= 1) return null
    return (
        <div className="flex w-full items-center justify-between">
            <p className="ml-2 text-sm">
                Showing{' '}
                <span className="font-semibold">
                    {(currentPage - 1) * PAGE_SIZE + 1}
                </span>{' '}
                to{' '}
                <span className="font-semibold">
                    {currentPage === pageCount
                        ? count
                        : currentPage * PAGE_SIZE}
                </span>{' '}
                of <span className="font-semibold">{count}</span> results
            </p>

            <div className="flex gap-2">
                <button
                    className="flex items-center justify-center gap-1 rounded-md py-2 pl-1 pr-3 transition-all duration-300 hover:bg-primary-600"
                    onClick={previousPage}
                    disabled={currentPage === 1}
                >
                    <ChevronLeftIcon className="size-5" />
                    <span>Previous</span>
                </button>
                <button
                    className="flex items-center justify-center gap-1 rounded-md py-2 pl-3 pr-1 transition-all duration-300 hover:bg-primary-600"
                    onClick={nextPage}
                    disabled={currentPage === pageCount}
                >
                    <span>Next</span>
                    <ChevronRightIcon className="size-5" />
                </button>
            </div>
        </div>
    )
}

export default Pagination
