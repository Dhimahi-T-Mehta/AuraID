import { useEffect, useState } from "react";

import "../styles/sessionHistory.css";

import {

    fetchSessions,

    searchSessions,

    deleteSession,

} from "../services/sessionService";

import {

    compareSessions,

} from "../services/sessionService";

function SessionHistoryModal({

    open,

    onClose,

    onCompare,

}) {

    const [sessions, setSessions] = useState([]);

    const [emotion, setEmotion] = useState("");

    const [date, setDate] = useState("");

    const [confidence, setConfidence] = useState("");

    const [duration,setDuration]=useState("");

    const [sort,setSort]=useState("created_at");

    const [order,setOrder]=useState("DESC");

    const [selectedSessions, setSelectedSessions] = useState([]);

    useEffect(() => {

        loadSessions();

    }, []);

    async function loadSessions() {

        try {

            const data = await fetchSessions();

            setSessions(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleSearch() {

        try {

            const data = await searchSessions({

                    emotion,

                    date,

                    confidence,

                    duration,

                    sort,

                    order,

                });

            setSessions(data);

        }

        catch (error) {

            console.error(error);

        }

    }

    async function clearFilters() {

        setEmotion("");

        setDate("");

        setConfidence("");

        loadSessions();

        setDuration("");

        setSort("created_at");

        setOrder("DESC");

    }

    function toggleSelection(id) {

        setSelectedSessions((previous) => {

            if (previous.includes(id)) {

                return previous.filter(

                    (sessionId) => sessionId !== id

                );

            }

            if (previous.length >= 2) {

                return previous;

            }

            return [...previous, id];

        });

    }

    async function handleDelete(id) {

        const confirmed = window.confirm(

            "Delete this session?"

        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteSession(id);

            loadSessions();

            setSelectedSessions([]);

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete session.");

        }

    }

    async function handleCompare() {

        if (selectedSessions.length !== 2) {

            alert(

                "Please select exactly two sessions."

            );

            return;

        }

        try {

            const result = await compareSessions(

                selectedSessions[0],

                selectedSessions[1],

            );

           onCompare(result);

        }

        catch (error) {

            console.error(error);

            alert(

                "Unable to compare sessions."

            );

        }

    }

    if (!open) return null;

    return (

        <div className="history-overlay">

            <div className="history-modal">

                <div className="history-header">

                    <h2>📜 Session History</h2>

                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>

                <div className="history-toolbar">

                    <select

                        value={emotion}

                        onChange={(e) =>

                            setEmotion(e.target.value)

                        }

                    >

                        <option value="">

                            All Emotions

                        </option>

                        <option>

                            Happy

                        </option>

                        <option>

                            Neutral

                        </option>

                        <option>

                            Angry

                        </option>

                        <option>

                            Sad

                        </option>

                        <option>

                            Fear

                        </option>

                        <option>

                            Surprise

                        </option>

                        <option>

                            Disgust

                        </option>

                    </select>

                    <input

                        type="date"

                        value={date}

                        onChange={(e)=>

                            setDate(e.target.value)

                        }

                    />

                    <input

                        type="number"

                        placeholder="Min Confidence"

                        value={confidence}

                        onChange={(e)=>

                            setConfidence(e.target.value)

                        }

                    />

                    <input

                        type="number"

                        placeholder="Min Duration (sec)"

                        value={duration}

                        onChange={(e)=>

                        setDuration(e.target.value)

                        }

                        />

                        <select

                            value={sort}

                            onChange={(e)=>

                            setSort(e.target.value)

                            }

                            >

                            <option value="created_at">

                            Newest

                            </option>

                            <option value="average_confidence">

                            Confidence

                            </option>

                            <option value="average_fps">

                            FPS

                            </option>

                            <option value="total_predictions">

                            Predictions

                            </option>

                            <option value="duration">

                            Duration

                            </option>

                        </select>

                        <select

                            value={order}

                            onChange={(e)=>

                            setOrder(e.target.value)

                            }

                            >

                            <option value="DESC">

                            Descending

                            </option>

                            <option value="ASC">

                            Ascending

                            </option>

                            </select>

                    <button

                        onClick={handleSearch}

                    >

                        Search

                    </button>

                    <button

                        onClick={clearFilters}

                    >

                        Clear

                    </button>

                </div>

                <div className="active-filters">

                    {emotion &&

                        <span>

                            😊 {emotion}

                        </span>

                    }

                    {date &&

                        <span>

                            📅 {date}

                        </span>

                    }

                    {confidence &&

                        <span>

                            🎯 ≥ {confidence}%

                        </span>

                    }

                    {duration &&

                        <span>

                            ⏱ ≥ {duration}s

                        </span>

                    }

                </div>

                <div className="history-list">

                    {sessions.length === 0 ? (

                        <p>No sessions found.</p>

                    ) : (

                        sessions.map((session) => (

                            <div
                                key={session.id}
                                className="history-card"
                            >

                                <div className="history-card-header">

                                    <label>

                                        <input

                                            type="checkbox"

                                            checked={selectedSessions.includes(

                                                session.id

                                            )}

                                            onChange={() =>

                                                toggleSelection(session.id)

                                            }

                                        />

                                        Compare

                                    </label>

                                    <button

                                        className="delete-button"

                                        onClick={() =>

                                            handleDelete(session.id)

                                        }

                                    >

                                        🗑 Delete

                                    </button>

                                </div>

                                <h3>

                                    {session.created_at}

                                </h3>

                                <p>

                                    😊 {session.dominant_emotion}

                                </p>

                                <p>

                                    Duration : {session.duration}

                                </p>

                                <p>

                                    Confidence :

                                    {session.average_confidence}%

                                </p>

                                <p>

                                    FPS :

                                    {session.average_fps}

                                </p>

                                <p>

                                    Predictions :

                                    {session.total_predictions}

                                </p>

                            </div>
                            
                        ))

                    )}

                </div>

                <div className="history-footer">

                    <button

                        onClick={handleCompare}

                        disabled={

                            selectedSessions.length !== 2

                        }

                    >

                        📊 Compare Selected

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SessionHistoryModal;