import "../styles/sessionComparison.css";

function parseDuration(duration) {

    if (!duration) return 0;

    const [minutes, seconds] = duration.split(":").map(Number);

    return minutes * 60 + seconds;

}

function emotionClass(emotion) {

    switch (emotion?.toLowerCase()) {

        case "happy":
            return "emotion happy";

        case "angry":
            return "emotion angry";

        case "sad":
            return "emotion sad";

        case "fear":
            return "emotion fear";

        case "surprise":
            return "emotion surprise";

        case "disgust":
            return "emotion disgust";

        default:
            return "emotion neutral";

    }

}

function winner(left, right) {

    if (left > right) return "left";

    if (right > left) return "right";

    return "tie";

}

function MetricRow({

    label,

    left,

    right,

    leftDisplay,

    rightDisplay,

}) {

    const win = winner(left, right);

    return (

        <div className="metric-row">

            <div className="metric-label">

                {label}

            </div>

            <div className={`metric-value ${win === "left" ? "winner" : ""}`}>

                {leftDisplay}

            </div>

            <div className={`metric-value ${win === "right" ? "winner" : ""}`}>

                {rightDisplay}

            </div>

        </div>

    );

}

function ConfidenceBar({ value }) {

    return (

        <div>

            <div className="confidence-bar">

                <div

                    className="confidence-fill"

                    style={{

                        width: `${Math.min(value, 100)}%`

                    }}

                />

            </div>

            <span>

                {value}%

            </span>

        </div>

    );

}

export default function SessionComparisonModal({

    open,

    onClose,

    sessionA,

    sessionB,

}) {

    if (!open || !sessionA || !sessionB)

        return null;

    const confidenceWinner = winner(

        sessionA.average_confidence,

        sessionB.average_confidence

    );

    const fpsWinner = winner(

        sessionA.average_fps,

        sessionB.average_fps

    );

    const durationWinner = winner(

        parseDuration(sessionA.duration),

        parseDuration(sessionB.duration)

    );

    const predictionWinner = winner(

        sessionA.total_predictions,

        sessionB.total_predictions

    );

    return (

        <div className="compare-overlay">

            <div className="compare-modal">

                <div className="compare-header">

                    <h2>

                        📊 Session Comparison

                    </h2>

                    <button onClick={onClose}>

                        ✕

                    </button>

                </div>

                <div className="compare-grid">

                    <div />

                    <div>

                        <h3>

                            Session A

                        </h3>

                    </div>

                    <div>

                        <h3>

                            Session B

                        </h3>

                    </div>

                    <MetricRow

                        label="Created"

                        left={0}

                        right={0}

                        leftDisplay={sessionA.created_at}

                        rightDisplay={sessionB.created_at}

                    />

                    <div className="metric-row">

                        <div className="metric-label">

                            Emotion

                        </div>

                        <div>

                            <span className={emotionClass(sessionA.dominant_emotion)}>

                                😊 {sessionA.dominant_emotion}

                            </span>

                        </div>

                        <div>

                            <span className={emotionClass(sessionB.dominant_emotion)}>

                                😊 {sessionB.dominant_emotion}

                            </span>

                        </div>

                    </div>

                    <div className="metric-row">

                        <div className="metric-label">

                            Confidence

                        </div>

                        <div className={confidenceWinner === "left" ? "winner" : ""}>

                            <ConfidenceBar value={sessionA.average_confidence} />

                        </div>

                        <div className={confidenceWinner === "right" ? "winner" : ""}>

                            <ConfidenceBar value={sessionB.average_confidence} />

                        </div>

                    </div>

                    <MetricRow

                        label="Duration"

                        left={parseDuration(sessionA.duration)}

                        right={parseDuration(sessionB.duration)}

                        leftDisplay={sessionA.duration}

                        rightDisplay={sessionB.duration}

                    />

                    <MetricRow

                        label="FPS"

                        left={sessionA.average_fps}

                        right={sessionB.average_fps}

                        leftDisplay={sessionA.average_fps}

                        rightDisplay={sessionB.average_fps}

                    />

                    <MetricRow

                        label="Predictions"

                        left={sessionA.total_predictions}

                        right={sessionB.total_predictions}

                        leftDisplay={sessionA.total_predictions}

                        rightDisplay={sessionB.total_predictions}

                    />

                </div>

                <div className="winner-summary">

                    <h3>

                        🏆 Winner Summary

                    </h3>

                    <ul>

                        <li>

                            Higher Confidence →

                            {confidenceWinner === "left"

                                ? " Session A"

                                : confidenceWinner === "right"

                                ? " Session B"

                                : " Tie"}

                        </li>

                        <li>

                            Better FPS →

                            {fpsWinner === "left"

                                ? " Session A"

                                : fpsWinner === "right"

                                ? " Session B"

                                : " Tie"}

                        </li>

                        <li>

                            Longer Session →

                            {durationWinner === "left"

                                ? " Session A"

                                : durationWinner === "right"

                                ? " Session B"

                                : " Tie"}

                        </li>

                        <li>

                            More Predictions →

                            {predictionWinner === "left"

                                ? " Session A"

                                : predictionWinner === "right"

                                ? " Session B"

                                : " Tie"}

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

}