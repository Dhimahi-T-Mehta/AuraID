import CountUp from "react-countup";

const subtitles = {
    "Current Emotion": "Emotion Detection",
    Confidence: "AI Confidence",
    Faces: "Face Tracking",
    FPS: "Frames / Second",
    Session: "Current Session",
};

const footers = {

CurrentEmotion:"Real-time",

Confidence:"Prediction",

Faces:"Detection",

FPS:"Performance",

Session:"Timer"

};

function StatsCard({
  title,
  value,
  icon,
  accentColor,
}) {

const numeric = !isNaN(value);

  return (
    <div
  className="stats-card"
  style={
    accentColor
      ? {
          borderColor: accentColor,
          boxShadow: `0 0 20px ${accentColor}55`,
        }
      : {}
  }
>
      <div className="stats-top">
        <span className="stats-icon">{icon}</span>

        <span className="live-dot"></span>
      </div>

      <h3
        style={{
          color: accentColor || "white",
        }}
      >
        {title}
      </h3>
      <p className="card-subtitle">
          {subtitles[title]}
      </p>
      <h2
        style={{
          color: accentColor || "white",
        }}
      >
        {numeric ? (
            <CountUp
                end={Number(value)}
                duration={0.5}
            />
          ) : (
              value
          )}
      </h2>

      <div className="stats-footer">

        {footers[title]}

      </div>

    </div>
  );
}

export default StatsCard;