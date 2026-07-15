function SessionSummaryModal({
  open,
  summary,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="summary-overlay">

      <div className="summary-modal">

        <h2>🎉 Session Complete</h2>

        <div className="summary-grid">

          <div>
            <span>⏱ Duration</span>
            <strong>{summary.duration}</strong>
          </div>

          <div>
            <span>😊 Dominant Emotion</span>
            <strong>{summary.emotion}</strong>
          </div>

          <div>
            <span>🎯 Avg Confidence</span>
            <strong>{summary.confidence}%</strong>
          </div>

          <div>
            <span>👤 Faces Detected</span>
            <strong>{summary.faces}</strong>
          </div>

        </div>

        <p className="summary-message">
          ✔ Session completed successfully.
          Your report is ready.
        </p>

        <button onClick={onClose}>
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default SessionSummaryModal;