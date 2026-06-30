import { useState } from "react";

import Hero from "../components/Hero";
import Loader from "../components/Loader";
import VideoOverlay from "../components/VideoOverlay";

function LandingPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const startCamera = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 2000);
  };

  return (
    <div className="app">
      <Hero onStart={startCamera} />

      {loading && <Loader />}

      {open && (
        <VideoOverlay
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default LandingPage;