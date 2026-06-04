const BASE_URL = process.env.API_BASE_URL;

export async function getTasks() {
    console.log("calling api", `${BASE_URL}/task`)
    const res = await fetch(`${BASE_URL}/task`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch tasks");

    return res.json();
}