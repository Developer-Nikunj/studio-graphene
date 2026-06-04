import React from 'react'

const DeleteTaskModal = ({ task, onClose, onDelete }) => {
    const handleDelete = () => {
        onDelete(task.id);
        onClose();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Delete Task</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">✕</button>
            </div>

            <p className="text-sm text-gray-500 mb-1">Are you sure you want to delete:</p>
            <p className="text-sm font-medium text-gray-800 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mb-6">
                {task.title}
            </p>

            <div className="flex gap-2">
                <button
                    onClick={onClose}
                    className="flex-1 py-2 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition-all"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteTaskModal