import StatsCard from "./StatsCard";

import { useSessionTimer } from "../hooks/useSessionTimer";
import { useAnalytics } from "../hooks/useAnalytics";

function StatsGrid() {

const analytics = useAnalytics();
const sessionTime = useSessionTimer();

const emotionColors = {
  Happy: "#22c55e",
  Neutral: "#94a3b8",
  Sad: "#3b82f6",
  Angry: "#ef4444",
  Fear: "#a855f7",
  Surprise: "#f59e0b",
  Disgust: "#14b8a6",
};

const currentColor =
  emotionColors[analytics.emotion] || "#475569";

  return (
    <div className="stats-grid">
      <StatsCard
          title="Current Emotion"
          value={analytics.emotion}
          icon="😊"
          accentColor={currentColor}
      />

      <StatsCard
        title="Confidence"
        value={`${analytics.confidence}%`}
        icon="🎯"
        accentColor={currentColor}
      />

      <StatsCard
        title="Faces"
        value={analytics.faces}
        icon="👤"
      />

      <StatsCard
        title="FPS"
        value={analytics.fps}
        icon="⚡"
      />

      <StatsCard
        title="Session"
        value={sessionTime}
        icon="⏱"
      />
    </div>
  );
}

export default StatsGrid;