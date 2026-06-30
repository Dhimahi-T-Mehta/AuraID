function VideoOverlay({ onClose }) {
  return (
    <div className="video-overlay">
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>

      <img
        src="http://127.0.0.1:5000/video"
        alt="AuraID Live"
        className="video-feed"
      />
    </div>
  );
}

export default VideoOverlay;