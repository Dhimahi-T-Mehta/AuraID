import { resetSession } from "../services/sessionService";
function ActionBar({ onEndSession }) {
  const handleEndSession = async () => {

    await resetSession();

    onEndSession();

};
  return (
    <div className="action-bar">

      <button className="secondary-btn">
        ⬇ Download Report
      </button>

      <button className="secondary-btn">
        💾 Save Session
      </button>

      <button
        className="danger-btn"
        onClick={handleEndSession}
      >
        ⏹ End Session
      </button>

    </div>
  );
}

export default ActionBar;