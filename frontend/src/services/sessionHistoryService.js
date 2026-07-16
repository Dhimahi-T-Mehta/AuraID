const API = "http://127.0.0.1:5000";

export async function fetchSessions() {

    const response = await fetch(`${API}/sessions`);

    if (!response.ok) {
        throw new Error("Failed to fetch sessions");
    }

    return await response.json();

}