import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function EmotionDistribution({ history }) {
  const icons = {
    Happy: "😊",
    Neutral: "😐",
    Sad: "😢",
    Angry: "😠",
    Fear: "😨",
    Surprise: "😲",
    Disgust: "🤢",
  };

  const COLORS = {
  Happy: "#22c55e",
  Neutral: "#94a3b8",
  Sad: "#3b82f6",
  Angry: "#ef4444",
  Fear: "#a855f7",
  Surprise: "#f59e0b",
  Disgust: "#14b8a6",
};

  const counts = {};

  history.forEach((item) => {
    counts[item.emotion] = (counts[item.emotion] || 0) + 1;
  });

  const total = history.length;

  const distribution = Object.entries(counts)
    .map(([emotion, count]) => ({
      emotion,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="analytics-card">
      <h3>📊 Emotion Distribution</h3>

      {distribution.length === 0 ? (
        <p className="empty-state">
          Waiting for emotion data...
        </p>
      ) : (
          
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>

              <Pie
                data={distribution}
                dataKey="count"
                nameKey="emotion"
                cx="50%"
                cy="50%"
                outerRadius={85}
                innerRadius={45}
                paddingAngle={3}
                animationDuration={500}
                animationEasing="ease-out"
              >

                {distribution.map((entry) => (
                  <Cell
                    key={entry.emotion}
                    fill={COLORS[entry.emotion]}
                  />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        )}
    </div>
  );
}

export default EmotionDistribution;