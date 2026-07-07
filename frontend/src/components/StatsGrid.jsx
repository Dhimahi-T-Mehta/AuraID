import StatsCard from "./StatsCard";

import { useSessionTimer } from "../hooks/useSessionTimer";
import { useAnalytics } from "../hooks/useAnalytics";

function StatsGrid() {

const analytics = useAnalytics();
const sessionTime = useSessionTimer();

  return (
    <div className="stats-grid">
      <StatsCard
        title="Current Emotion"
        value={analytics.emotion}
        icon="😊"
      />

      <StatsCard
        title="Confidence"
        value={`${analytics.confidence}%`}
        icon="🎯"
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