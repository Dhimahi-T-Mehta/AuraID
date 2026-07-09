import EmotionDistribution from "./EmotionDistribution";
import EmotionTimeline from "./EmotionTimeline";

function AnalyticsPanel({ history }) {
  return (
    <section className="analytics-panel">

      <h2>Emotion Analytics</h2>

      <EmotionDistribution history={history} />

      <EmotionTimeline history={history} />

      <div className="analytics-card">
        <h3>🤖 AI Insights</h3>

        <p>
          AI-generated session insights will be available in Phase 5.
        </p>
      </div>

    </section>
  );
}

export default AnalyticsPanel;