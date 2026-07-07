import { useEmotionHistory } from "../hooks/useEmotionHistory";
function EmotionDistribution() {

  const history = useEmotionHistory();

  const counts = {};

  history.forEach((item) => {
    counts[item.emotion] = (counts[item.emotion] || 0) + 1;
  });

  return (

    <div className="analytics-card">

      <h3>📊 Emotion Distribution</h3>

      {Object.keys(counts).length === 0 ? (

        <p className="empty-state">
          Waiting for emotion data...
        </p>

      ) : (

        Object.entries(counts).map(([emotion, count]) => (

          <div key={emotion} className="distribution-row">

            <span>{emotion}</span>

            <strong>{count}</strong>

          </div>

        ))

      )}

    </div>

  );

}

export default EmotionDistribution;