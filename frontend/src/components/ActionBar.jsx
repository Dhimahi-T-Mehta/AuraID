import { resetSession } from "../services/sessionService";
import { useState } from "react";
function ActionBar({ onEndSession }) {

const [loading,setLoading]=useState(false);

const handleEndSession = async ()=>{

setLoading(true);

await resetSession();

onEndSession();

setTimeout(()=>{

setLoading(false);

},1000);

};

  return (
    <div className="action-bar">

      <button
        disabled={loading}
        >

        ⬇ Download Report

        </button>

      <button
        disabled={loading}
        >

          💾 Save Session

        </button>

      <button
        disabled={loading}
        className="danger-btn"
        onClick={handleEndSession}
        >

        ⏹ End Session

        </button>

    </div>
  );
}

export default ActionBar;