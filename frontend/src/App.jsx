import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";

function App() {

  const [sessionStarted, setSessionStarted] = useState(false);

  return (
    <>
      {sessionStarted ? (
        <DashboardPage
          onEndSession={() => setSessionStarted(false)}
        />
      ) : (
        <LandingPage
          onStartSession={() => setSessionStarted(true)}
        />
      )}
    </>
  );

}

export default App;