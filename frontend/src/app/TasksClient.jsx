"use client"
import React from 'react'
import { useState, useMemo } from 'react';
import { DndContext, PointerSensor, closestCorners, useSensors, useSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core"
import { Column } from '../components/column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Modal from "../components/modal/Modal"
import AddTaskModal from "../components/task/AddTaskModal"
import DeleteTaskModal from "../components/task/DeleteTaskModal"
import EditTaskModal from "../components/task/EditTaskModal"
import { addTask, DeleteTask, reOrderTask } from "../services/taskService"

const FILTERS = ['all', 'active', 'completed'];

const TasksClient = ({ allTasks }) => {
    const [tasks, setTasks] = useState(allTasks);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteTask, setDeleteTask] = useState(null);
    const [editTask, setEditTask] = useState(null);

    const filteredTasks = useMemo(() => {
        return tasks
            .filter(task => {
                if (filter === 'active') return task.isActive;
                if (filter === 'completed') return task.isCompleted;
                return true;
            })
            .filter(task =>
                task.title.toLowerCase().includes(search.toLowerCase())
            );
    }, [tasks, search, filter]);

    console.log("tasks",tasks);

    const getTaskPos = id => tasks.findIndex(task => task.id === id);

    const handleDragEnd = event => {
        const { active, over } = event

        if (active.id === over.id) return;

        setTasks(tasks => {
            const originalPos = getTaskPos(active.id)
            const newPos = getTaskPos(over.id)
            const reordered = arrayMove(tasks, originalPos, newPos);
            const prevTask = reordered[newPos - 1] || null;
            const nextTask = reordered[newPos + 1] || null;

            const prevOrder = prevTask ? prevTask.order : 0;
            const nextOrder = nextTask ? nextTask.order : prevOrder + 2000;

            const newOrder = (prevOrder + nextOrder) / 2;

            console.log("prevOrder", prevOrder, "nextOrder", nextOrder, "newOrder", newOrder);

            reordered[newPos] = { ...reordered[newPos], order: newOrder };

            reOrderTask(reordered[newPos].id, prevOrder, nextOrder);
            return reordered;
        })
    }

    const sensors = useSensors(
        useSensor(PointerSensor,
            {
                activationConstraint: {
                    distance: 10,
                }
            }
        ),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleAddTask = async (newTask) => {
        const saved = await addTask(newTask);
        setTasks(prev => [...prev, saved.data]);
    }
    const handleDeleteTask = async (id) => {
        await DeleteTask(id);
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    const handleSaveTask = (updatedTask) => {
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    }

    const activeCount = tasks.filter(t => t.isActive).length;
    const completedCount = tasks.filter(t => t.isCompleted).length;
    const overdueCount = tasks.filter(t =>
        !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;
    const notCompletedCount = tasks.filter(t => !t.isCompleted).length;


    return (
        <div className="min-h-screen px-4 py-8">

            <div className="mx-auto">

                {/* Header */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Active</p>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600 text-lg">🕐</span>
                            <span className="text-2xl font-medium text-gray-800">{activeCount}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Completed</p>
                        <div className="flex items-center gap-2">
                            <span className="text-green-600 text-lg">✅</span>
                            <span className="text-2xl font-medium text-gray-800">{completedCount}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Overdue</p>
                        <div className="flex items-center gap-2">
                            <span className="text-red-500 text-lg">⚠️</span>
                            <span className="text-2xl font-medium text-gray-800">{overdueCount}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Not completed</p>
                        <div className="flex items-center gap-2">
                            <span className="text-amber-500 text-lg">🔄</span>
                            <span className="text-2xl font-medium text-gray-800">{notCompletedCount}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-800">All Tasks</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                    >
                        + Add Task
                    </button>

                </div>
                {/* search */}
                <div className="relative mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>
                {/* filter */}
                <div className="flex gap-1.5 mb-5">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 text-sm rounded-lg font-medium capitalize transition-all
                                ${filter === f
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                    <span className="ml-auto text-xs text-gray-400 self-center">
                        {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Task list */}
                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCorners}
                >
                    <Column
                        tasks={filteredTasks}
                        onEdit={(task) => setEditTask(task)}
                        onDelete={(task) => setDeleteTask(task)}
                    />
                </DndContext>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AddTaskModal
                        onClose={() => setIsModalOpen(false)}
                        onAdd={handleAddTask}
                    />
                </Modal>

                <Modal isOpen={!!deleteTask} onClose={() => setDeleteTask(null)}>
                    {deleteTask && (
                        <DeleteTaskModal
                            task={deleteTask}
                            onClose={() => setDeleteTask(null)}
                            onDelete={handleDeleteTask}
                        />
                    )}
                </Modal>

                <Modal isOpen={!!editTask} onClose={() => setEditTask(null)}>
                    {editTask && (
                        <EditTaskModal
                            task={editTask}
                            onClose={() => setEditTask(null)}
                            onSave={handleSaveTask}
                        />
                    )}
                </Modal>

                {filteredTasks.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-4xl mb-3">📭</p>
                        <p className="text-sm">No tasks found</p>
                    </div>
                )}

            </div>

        </div>
    )
}

export default TasksClient
