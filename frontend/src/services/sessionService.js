const API_URL = "http://127.0.0.1:5000";

export async function resetSession() {

    const response = await fetch(
        `${API_URL}/reset-session`,
        {
            method: "POST",
        }
    );

    return await response.json();

}

export async function fetchSessions() {

    const response = await fetch(
        `${API_URL}/sessions`
    );

    if (!response.ok) {
        throw new Error("Unable to fetch sessions");
    }

    return await response.json();

}