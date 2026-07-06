function CameraPanel() {
  return (
    <section className="camera-panel">

      <div className="panel-header">
        <h2>Live Camera Feed</h2>
        <span className="live-badge">● LIVE</span>
      </div>

      <div className="camera-status">
          Camera Status: 
          <span>Running</span>
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