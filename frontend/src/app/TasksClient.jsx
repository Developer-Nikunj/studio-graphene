"use client"
import React from 'react'
import { useState } from 'react';
import { DndContext, PointerSensor, closestCorners, useSensors, useSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core"
import { Column } from '../components/column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const TasksClient = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Add new 1" },
        { id: 2, title: "Add new 2" },
        { id: 3, title: "Add new 3" }
    ]);

    const getTaskPos = id => tasks.findIndex(task => task.id === id);

    const handleDragEnd = event => {
        const { active, over } = event

        if (active.id === over.id) return;

        setTasks(tasks => {
            const originalPos = getTaskPos(active.id)
            const newPos = getTaskPos(over.id)

            return arrayMove(tasks, originalPos, newPos)
        })
    }
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    return (
        <div>
            <h1>My Tasks</h1>
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <Column tasks={tasks} />
            </DndContext>
        </div>
    )
}

export default TasksClient
