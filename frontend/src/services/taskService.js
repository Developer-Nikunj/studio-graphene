
// const BASE_URL = "https://opulent-capybara-pj554wr5jx5gf7p5q-3001.app.github.dev/api/v1";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function getTasks() {
    try {
        console.log("URL for GET is ", `${BASE_URL}/task`);
        const res = await fetch(`${BASE_URL}/task`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return await res.json();
    } catch (error) {
        console.error("getTasks:", error.message);
        throw error;
    }
}

export async function addTask(newTask) {
    try {
        console.log("URL for POST is ", `${BASE_URL}/task`);
        const res = await fetch(`${BASE_URL}/task`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });
        if (!res.ok) throw new Error("Failed to add task");
        return await res.json();
    } catch (error) {
        console.error("addTask:", error.message);
        throw error;
    }
}

export async function DeleteTask(id) {
    try {
        console.log("URL for DELETE is ", `${BASE_URL}/task/${id}`);
        const res = await fetch(`${BASE_URL}/task/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to delete task");
        return await res.json();
    } catch (error) {
        console.error("DeleteTask:", error.message);
        throw error;
    }
}

export async function getTaskById(id) {
    try {
        console.log("URL for GET ONE is ", `${BASE_URL}/task/${id}`);
        const res = await fetch(`${BASE_URL}/task/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch task");
        return await res.json();
    } catch (error) {
        console.error("getTaskById:", error.message);
        throw error;
    }
}

export async function updateTask(id, updatedTask) {
    try {
        console.log("URL for UPDATE is ", `${BASE_URL}/task/${id}`);
        const res = await fetch(`${BASE_URL}/task/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        });
        if (!res.ok) throw new Error("Failed to update task");
        return await res.json();
    } catch (error) {
        console.error("updateTask:", error.message);
        throw error;
    }
}

export async function reOrderTask(taskId, previousOrder, nextOrder) {
    try {
        console.log("URL for Re order is ", `${BASE_URL}/re-order`);
        const res = await fetch(`${BASE_URL}/re-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId, previousOrder, nextOrder }),
        });
        if (!res.ok) throw new Error("Failed to reorder task");
        return await res.json();
    } catch (error) {
        console.error("reOrderTask:", error.message);
        throw error;
    }
}