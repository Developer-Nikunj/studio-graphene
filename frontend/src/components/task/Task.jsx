import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';

const Task = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-2 p-3 mb-2 bg-white rounded shadow text-black
                ${isDragging ? 'opacity-50 shadow-lg' : ''}`}
        >
            {/* Drag handle only — listeners isolated here */}
            <span
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-gray-400 px-1 touch-none"
            >
                ⠿
            </span>

            <input
                type="checkbox"
                onClick={e => e.stopPropagation()} // prevent any drag interference
            />
            <span>{title}</span>
        </div>
    )
}

export default Task