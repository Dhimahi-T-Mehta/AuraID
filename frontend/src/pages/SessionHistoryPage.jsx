import "../styles/dashboard.css";
import { useSessions } from "../hooks/useSessions";

function SessionHistoryPage() {

    const { sessions } = useSessions();

    return (

        <div className="dashboard-page">

            <h1>📜 Session History</h1>

            <div className="history-grid">

                {sessions.map(session => (

                    <div
                        key={session.id}
                        className="analytics-card"
                    >

                        <h3>
                            😊 {session.dominant_emotion}
                        </h3>

                        <p>
                            <strong>Date:</strong>
                            {" "}
                            {session.created_at}
                        </p>

                        <p>
                            <strong>Duration:</strong>
                            {" "}
                            {session.duration}
                        </p>

                        <p>
                            <strong>Confidence:</strong>
                            {" "}
                            {session.average_confidence}%
                        </p>

                        <p>
                            <strong>FPS:</strong>
                            {" "}
                            {session.average_fps}
                        </p>

                        <p>
                            <strong>Faces:</strong>
                            {" "}
                            {session.max_faces}
                        </p>

                        <p>
                            <strong>Samples:</strong>
                            {" "}
                            {session.total_predictions}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default SessionHistoryPage;