import React, { useState } from 'react'

const AddTaskModal = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, dueDate, isCompleted: false });
        onClose();
    }

    return (
        <div>
            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Add Task</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="Task title..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddTaskModal