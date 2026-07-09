import { useAnalytics } from "../hooks/useAnalytics";

function CameraPanel() {

  const analytics = useAnalytics();

  return (
    <section className="camera-panel">

      <div className="panel-header">
        <h2>Live Camera Feed</h2>
        <span className="live-badge">● LIVE</span>
      </div>

      <div className="camera-status-grid">

        <div className="status-item">
          <span>🟢 LIVE</span>
        </div>

        <div className="status-item">
          <span>📷</span>
          <strong>
            {analytics.width} × {analytics.height}
          </strong>
        </div>

        <div className="status-item">
          <span>👤</span>
          <strong>
            {analytics.faces} Face{analytics.faces !== 1 ? "s" : ""}
          </strong>
        </div>

        <div className="status-item">
          <span>⚡</span>
          <strong>
            {analytics.fps} FPS
          </strong>
        </div>

        <div className="status-item">
          <span>🧠</span>
          <strong>{analytics.model}</strong>
        </div>

      </div>

      <img
        src="http://127.0.0.1:5000/video"
        alt="AuraID Live"
        className="dashboard-video"
      />

    </section>
  );
}

export default CameraPanel;