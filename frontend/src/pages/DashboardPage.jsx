import DashboardHeader from "../components/DashboardHeader";
import StatsGrid from "../components/StatsGrid";
import CameraPanel from "../components/CameraPanel";
import AnalyticsPanel from "../components/AnalyticsPanel";
import ActionBar from "../components/ActionBar";
import "../styles/dashboard.css";

import { useEmotionHistory } from "../hooks/useEmotionHistory";
import { useState } from "react";
import SessionSummaryModal from "../components/SessionSummaryModal";
import SessionHistoryModal from "../components/SessionHistoryModal";

function DashboardPage({ onEndSession }) {

  const history = useEmotionHistory();
  const [showSummary, setShowSummary] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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
        onHistory={() => setShowHistory(true)}
      />
      <SessionHistoryModal
          open={showHistory}
          onClose={() => setShowHistory(false)}
      />
    </div>
  );
}

export default DashboardPage;