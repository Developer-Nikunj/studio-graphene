import React from 'react'

const Header = () => {
    return (
        <header className="bg-blue-600 px-6 h-16 flex items-center w-full">
            <div className="flex items-center gap-2.5">
                <div className="bg-white rounded-md p-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                </div>
                <span className="text-white font-bold text-lg">Task Manager</span>
            </div>
        </header>
    )
}

export default Header