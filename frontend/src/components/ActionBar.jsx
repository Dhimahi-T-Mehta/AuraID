function ActionBar({ onEndSession }) {
  return (
    <div className="action-bar">

      <button className="secondary-btn">
        ⬇ Download Report
      </button>

      <button className="secondary-btn">
        💾 Save Session
      </button>

      <button
        className="primary-btn"
        onClick={onEndSession}
      >
        ⏹ End Session
      </button>

    </div>
  );
}

export default ActionBar;