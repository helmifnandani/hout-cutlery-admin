import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const AppLayout = () => {
    return (
        <div className="bg-accent-background grid h-screen grid-cols-[16rem_1fr] grid-rows-[auto_1fr]">
            <Header />
            <Sidebar />
            <main className="overflow-auto bg-green-50 px-12 py-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AppLayout
