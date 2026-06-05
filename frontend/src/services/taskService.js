const BASE_URL = "https://opulent-capybara-pj554wr5jx5gf7p5q-3001.app.github.dev/api/v1";

export async function getTasks() {
    console.log("calling api", `${BASE_URL}/task`);
    const res = await fetch(`${BASE_URL}/task`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data = await res.json();
    // console.log("res.json", data);
    return data;
}


export async function addTask(newTask) {
    const res = await fetch(`${BASE_URL}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
    });

    if (!res.ok) throw new Error("Failed to add task");
    return res.json();
}


export async function DeleteTask(id){
    const res = await fetch(`${BASE_URL}/task/${id}`,{
        method:"DELETE",
        headers:{"Content-Type": "application/json"}
    })

    if(!res.ok) throw new Error("Failed to delete task");
    return res.json();
}


export async function getTaskById(id) {
    const res = await fetch(`${BASE_URL}/task/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch task");
    return res.json();
}


export async function updateTask(id, updatedTask) {
    const res = await fetch(`${BASE_URL}/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
}


export async function reOrderTask(taskId,previousOrder,nextOrder) {
    const res = await fetch(`${BASE_URL}/re-order`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({taskId,previousOrder,nextOrder}),
    })
    if(!res.ok) throw new Error("Failed to Reorder");
    return res.json();
}