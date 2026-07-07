import { useEmotionHistory } from "../hooks/useEmotionHistory";
import "../index.css";

function EmotionTimeline() {

  const history = useEmotionHistory();

  return (

    <div className="analytics-card">

      <h3>📈 Emotion Timeline</h3>

      <div className="timeline-list">

        {history.length === 0 ? (

          <p className="empty-state">
            Waiting for emotion history...
          </p>

        ) : (

          history.slice(-10).reverse().map((item, index) => (

            <div
              key={index}
              className="timeline-item"
            >

              <span>{item.time}</span>

              <strong>{item.emotion}</strong>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default EmotionTimeline;