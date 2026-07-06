function StatsCard({ title, value, icon }) {
  return (
    <div className="stats-card">

      <div className="stats-top">
        <span className="stats-icon">{icon}</span>

        <span className="live-dot"></span>
      </div>

      <h4>{title}</h4>

      <h2>{value}</h2>

      <div className="stats-footer">
        Live Monitoring
      </div>

    </div>
  );
}

export default StatsCard;