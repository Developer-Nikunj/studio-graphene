"use client"
import React from 'react'
import { useState } from 'react';
import { DndContext, PointerSensor, closestCorners, useSensors, useSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core"
import { Column } from '../components/column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const TasksClient = ({allTasks}) => {
    const [tasks, setTasks] = useState(allTasks);

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
        useSensor(PointerSensor,
            {
                activationConstraint:{
                    distance:10,
                }
            }
        ),
        useSensor(TouchSensor,{
            activationConstraint:{
                delay:250,
                tolerance:5,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleAddTask = async()=>{

    }
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">

            <div className="mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-800">All Tasks</h1>
                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                    >
                        + Add Task
                    </button>
                </div>

                {/* Task list */}
                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCorners}
                >
                    <Column tasks={tasks} />
                </DndContext>

            </div>

        </div>
    )
}

export default TasksClient
