"use client"

import { useState } from "react"
import TaskTable from "../components/tasks/TaskTable";

export default function TasksClient({initialData}) {
    const [tasks,setTasks] = useState(initialData);
    const [addOpen,setAddOpen] = useState(false);
    const [editTarget,setEditTarget] = useState(null);

    return (
        <>
            <TaskTable
                data={tasks}
                onAdd={()=>setAddOpen(true)}
                onEdit={(row)=>setEditTarget(row)}
            />

           
        </>
    )
}