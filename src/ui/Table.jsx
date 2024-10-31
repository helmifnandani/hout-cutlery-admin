import { createContext, useContext } from 'react'

const TableContext = createContext()

const Table = ({ columns, children }) => {
    return (
        <TableContext.Provider value={{ columns }}>
            <div
                className="overflow-hidden rounded-md border border-gray-200 bg-primary-200 text-sm"
                role="table"
            >
                {children}
            </div>
        </TableContext.Provider>
    )
}

const Header = ({ children }) => {
    const { columns } = useContext(TableContext)
    return (
        <div
            role="row"
            className="grid items-center gap-6 border-b border-b-gray-100 bg-primary-500 px-6 py-4 font-semibold uppercase tracking-wide text-white transition-none"
            style={{
                gridTemplateColumns: columns,
            }}
        >
            {children}
        </div>
    )
}

const Row = ({ children }) => {
    const { columns } = useContext(TableContext)
    return (
        <div
            className={`grid items-center gap-6 px-6 py-3 transition-none [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-gray-100`}
            style={{
                gridTemplateColumns: columns,
            }}
        >
            {children}
        </div>
    )
}

const Body = ({ data, render, type, children }) => {
    if (!data?.length)
        return (
            <>
                {children}
                {type !== 'image' && (
                    <p className="m-6 flex h-full min-h-[calc(100vh-720px)] items-center justify-center text-center text-xl font-medium">
                        No data to show
                    </p>
                )}
            </>
        )

    return (
        <>
            <section className="my-1">{data.map(render)}</section>
            {children}
        </>
    )
}

const Footer = ({ children }) => {
    return (
        <footer className="flex justify-center bg-primary-500 py-3 text-white [&:not(:has(*))]:hidden">
            {children}
        </footer>
    )
}
Table.Header = Header
Table.Row = Row
Table.Body = Body
Table.Footer = Footer

export default Table
