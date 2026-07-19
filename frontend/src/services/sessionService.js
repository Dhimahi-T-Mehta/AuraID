const API_URL = "http://127.0.0.1:5000";

// --------------------------------------------------
// Session Controls
// --------------------------------------------------

export async function resetSession() {

    const response = await fetch(
        `${API_URL}/reset-session`,
        {
            method: "POST",
        }
    );

    return await response.json();

}

// --------------------------------------------------
// Session History
// --------------------------------------------------

export async function fetchSessions() {

    const response = await fetch(
        `${API_URL}/sessions`
    );

    if (!response.ok) {

        throw new Error(
            "Unable to fetch sessions"
        );

    }

    return await response.json();

}

export async function fetchSession(id) {

    const response = await fetch(
        `${API_URL}/sessions/${id}`
    );

    if (!response.ok) {

        throw new Error(
            "Unable to fetch session"
        );

    }

    return await response.json();

}

// --------------------------------------------------
// Search
// --------------------------------------------------

export async function searchSessions({

    emotion="",

    date="",

    confidence="",

    duration="",

    sort="created_at",

    order="DESC",

}={})

{

    const params=new URLSearchParams();

    if(emotion)

        params.append("emotion",emotion);

    if(date)

        params.append("date",date);

    if(confidence)

        params.append("confidence",confidence);

    if(duration)

        params.append("duration",duration);

    params.append("sort",sort);

    params.append("order",order);

    const response=await fetch(

        `${API_URL}/sessions/search?${params}`

    );

    if(!response.ok)

        throw new Error("Unable to search");

    return await response.json();

}

// --------------------------------------------------
// Compare
// --------------------------------------------------

export async function compareSessions(

    session1,

    session2,

) {

    const response = await fetch(

        `${API_URL}/sessions/compare`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify({

                session_1: session1,

                session_2: session2,

            }),

        }

    );

    if (!response.ok) {

        throw new Error(
            "Unable to compare sessions"
        );

    }

    return await response.json();

}

// --------------------------------------------------
// Delete
// --------------------------------------------------

export async function deleteSession(id) {

    const response = await fetch(

        `${API_URL}/sessions/${id}`,

        {

            method: "DELETE",

        }

    );

    if (!response.ok) {

        throw new Error(
            "Unable to delete session"
        );

    }

    return await response.json();

}

export async function deleteAllSessions() {

    const response = await fetch(

        `${API_URL}/sessions`,

        {

            method: "DELETE",

        }

    );

    if (!response.ok) {

        throw new Error(
            "Unable to delete sessions"
        );

    }

    return await response.json();

}