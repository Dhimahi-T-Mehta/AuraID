import DashboardHeader from "../components/DashboardHeader";
import StatsGrid from "../components/StatsGrid";
import CameraPanel from "../components/CameraPanel";
import AnalyticsPanel from "../components/AnalyticsPanel";
import ActionBar from "../components/ActionBar";
import "../styles/dashboard.css";

function DashboardPage({ onEndSession }) {
  return (
    <div className="dashboard-page">

      <DashboardHeader />

      <StatsGrid />

      <div className="dashboard-main">

        <CameraPanel />

        <AnalyticsPanel />

      </div>

      <ActionBar
        onEndSession={onEndSession}
      />

    </div>
  );
}

export default DashboardPage;