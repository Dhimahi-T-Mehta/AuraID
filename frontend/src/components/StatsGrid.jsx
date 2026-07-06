import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import { fetchAnalytics } from "../services/analyticsService";

function StatsGrid() {
  const [analytics, setAnalytics] = useState({
    emotion: "--",
    confidence: 0,
    faces: 0,
    fps: 0,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchAnalytics();
      setAnalytics(data);
    }, 250); 

    return () => clearInterval(interval);
  }, []);

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
        value="00:00"
        icon="⏱"
      />
    </div>
  );
}

export default StatsGrid;