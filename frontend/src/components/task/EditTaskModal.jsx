import React, { useState, useEffect } from 'react'
import { getTaskById, updateTask } from '../../services/taskService'

const EditTaskModal = ({ task, onClose, onSave }) => {
    const [editTask, setEditTask] = useState({
        id: '',
        title: '',
        description: '',
        isCompleted: false,
        isActive: false,
        dueDate: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskById(task.id);
                const data = response.data
                setEditTask({
                    id: data.id,
                    title: data.title,
                    description: data.description ?? '',
                    isCompleted: data.isCompleted,
                    isActive: data.isActive,
                    dueDate: data.dueDate?.split('T')[0] ?? '',
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [task.id]);

    const handleSubmit = async () => {
        if (!editTask.title.trim()) return;
        try {
            const saved = await updateTask(editTask.id, editTask);
            onSave(saved.data);
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="text-center py-8 text-gray-400 text-sm">Loading...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Edit Task</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">✕</button>
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={editTask.title}
                        onChange={e => setEditTask({ ...editTask, title: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={editTask.description}
                        onChange={e => setEditTask({ ...editTask, description: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                        type="date"
                        value={editTask.dueDate}
                        onChange={e => setEditTask({ ...editTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Active</label>
                    <div
                        onClick={() => setEditTask({ ...editTask, isActive: !editTask.isActive })}
                        className={`relative inline-flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 ${editTask.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${editTask.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isCompleted"
                        checked={editTask.isCompleted}
                        onChange={e => setEditTask({ ...editTask, isCompleted: e.target.checked })}
                        className="w-4 h-4 accent-blue-600"
                    />
                    <label htmlFor="isCompleted" className="text-sm text-gray-700">Mark as completed</label>
                </div>

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
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;