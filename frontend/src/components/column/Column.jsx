import React from "react";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "../task/Task";

export const Column = ({ tasks, onEdit, onDelete }) => {
    return (
        <div className="p-4 bg-blue-50 rounded">
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
                <Task 
                    id={task.id} 
                    title={task.title} 
                    isCompleted={task.isCompleted} 
                    dueDate={task.dueDate}  
                    key={task.id}
                    onEdit={() => onEdit(task)}
                    onDelete={() => onDelete(task)}
                />
            ))}
            </SortableContext>
        </div>
    );
};