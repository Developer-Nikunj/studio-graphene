import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';

const Task = ({ id, title, dueDate, isCompleted, onEdit, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-xl
                transition-colors hover:bg-gray-50
                ${isDragging ? 'opacity-50 shadow-lg' : ''}
                ${isCompleted ? 'opacity-70' : ''}`}
        >
            {/* Drag handle */}
            <span
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400 touch-none select-none text-xl flex-shrink-0 leading-none"
            >
                ⠿
            </span>

            {/* Title */}
            <span className={`flex-1 min-w-0 text-sm font-medium text-gray-800 truncate
                ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                {title}
            </span>

            {/* Due date */}
            {dueDate && !isNaN(new Date(dueDate)) ? (
                <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{new Date(dueDate).toISOString().split('T')[0]}</span>
                </div>
            ) : (
                <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>No date</span>
                </div>
            )}

            {/* Status badge */}
            <span className={`hidden sm:inline flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full
                ${isCompleted
                    ? 'bg-green-50 text-green-700'
                    : 'bg-amber-50 text-amber-700'}`}>
                {isCompleted ? 'Done' : 'Pending'}
            </span>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                    onClick={() => onEdit?.(id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg
                        border border-blue-200 text-blue-600 hover:bg-blue-50 active:scale-95 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                    onClick={() => onDelete?.(id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg
                        border border-red-200 text-red-500 hover:bg-red-50 active:scale-95 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    <span className="hidden sm:inline">Delete</span>
                </button>
            </div>
        </div>
    )
}

export default Task