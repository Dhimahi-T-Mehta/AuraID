import "../styles/sessionHistory.css";

import { useSessions } from "../hooks/useSessions";

function SessionHistoryModal({

    open,

    onClose,

}) {

    const sessions = useSessions();

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

                <div className="history-list">

                    {sessions.length === 0 ? (

                        <p>No sessions found.</p>

                    ) : (

                        sessions.map((session) => (

                            <div
                                key={session.id}
                                className="history-card"
                            >

                                <h3>

                                    {session.created_at}

                                </h3>

                                <p>

                                    😊 {session.dominant_emotion}

                                </p>

                                <p>

                                    Duration :
                                    {session.duration}

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

            </div>

        </div>

    );

}

export default SessionHistoryModal;