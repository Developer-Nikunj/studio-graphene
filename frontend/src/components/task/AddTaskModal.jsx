import React, { useState } from 'react'

const AddTaskModal = ({ onClose, onAdd }) => {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        active: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;
        onAdd({ ...newTask, isCompleted: false });
        onClose();
    };

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
                        value={newTask.title}
                        onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                        className="w-full px-3 py-2.5 text-black text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        placeholder="Task description..."
                        value={newTask.description}
                        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Active</label>
                    <div
                        onClick={() => setNewTask({ ...newTask, active: !newTask.active })}
                        className={`relative inline-flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 ${newTask.active ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                        <span
                            className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${newTask.active ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </div>
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
    );
};

export default AddTaskModal;