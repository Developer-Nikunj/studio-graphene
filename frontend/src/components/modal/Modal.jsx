import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal