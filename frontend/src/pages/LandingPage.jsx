import { useState } from "react";

import Hero from "../components/Hero";
import Loader from "../components/Loader";

function LandingPage({ onStartSession }) {
  const [loading, setLoading] = useState(false);

  const startSession = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onStartSession();
    }, 2000);
  };

  return (
    <div className="app">
      <Hero onStart={startSession} />

      {loading && <Loader />}
    </div>
  );
}

export default LandingPage;