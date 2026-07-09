import DashboardHeader from "../components/DashboardHeader";
import StatsGrid from "../components/StatsGrid";
import CameraPanel from "../components/CameraPanel";
import AnalyticsPanel from "../components/AnalyticsPanel";
import ActionBar from "../components/ActionBar";
import "../styles/dashboard.css";

import { useEmotionHistory } from "../hooks/useEmotionHistory";

function DashboardPage({ onEndSession }) {

  const history = useEmotionHistory();

  return (
    <div className="dashboard-page">

      <DashboardHeader />

      <StatsGrid />

      <div className="dashboard-main">

        <CameraPanel />

        <AnalyticsPanel history={history} />

      </div>

      <ActionBar
        onEndSession={onEndSession}
      />

    </div>
  );
}

export default DashboardPage;