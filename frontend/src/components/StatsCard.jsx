function StatsCard({
  title,
  value,
  icon,
  accentColor,
}) {
  return (
    <div
  className="stats-card"
  style={
    accentColor
      ? {
          borderColor: accentColor,
          boxShadow: `0 0 20px ${accentColor}55`,
        }
      : {}
  }
>
      <div className="stats-top">
        <span className="stats-icon">{icon}</span>

        <span className="live-dot"></span>
      </div>

      <h3
        style={{
          color: accentColor || "white",
        }}
      >
        {title}
      </h3>

      <h2
        style={{
          color: accentColor || "white",
        }}
      >
        {value}
      </h2>

      <div className="stats-footer">
        Live Monitoring
      </div>

    </div>
  );
}

export default StatsCard;