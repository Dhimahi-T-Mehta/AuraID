import { useEffect, useState } from "react";
import { fetchSessions } from "../services/sessionHistoryService";

export function useSessions() {

    const [sessions, setSessions] = useState([]);

    useEffect(() => {

        loadSessions();

    }, []);

    async function loadSessions() {

        const data = await fetchSessions();

        setSessions(data);

    }

    return sessions;

}