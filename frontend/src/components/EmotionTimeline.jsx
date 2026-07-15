import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "../index.css";

function EmotionTimeline({ history }) {

  const emotionMap = {
    Angry: 1,
    Disgust: 2,
    Fear: 3,
    Sad: 4,
    Neutral: 5,
    Happy: 6,
    Surprise: 7,
  };

  const reverseEmotionMap = {
  1: "Angry",
  2: "Disgust",
  3: "Fear",
  4: "Sad",
  5: "Neutral",
  6: "Happy",
  7: "Surprise",
};

  const chartData = history.slice(-20).map((item) => ({
  time: item.time,
  emotion: emotionMap[item.emotion] || 0,
}));

  return (

    <div className="analytics-card">

      <h3>📈 Emotion Timeline</h3>

      {chartData.length === 0 ? (

  <p className="empty-state">
    Waiting for emotion history...
  </p>

) : (

  <ResponsiveContainer width="100%" height={220}>

    <LineChart data={chartData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="time" />

      <YAxis
        ticks={[1,2,3,4,5,6,7]}
        domain={[1,7]}
        tickFormatter={(value) => reverseEmotionMap[value]}
      />

      <Tooltip
        formatter={(value) => reverseEmotionMap[value]}
      />

      <Line
        type="monotone"
        dataKey="emotion"
        stroke="#00e5ff"
        strokeWidth={3}
        dot={false}
      />

    </LineChart>

  </ResponsiveContainer>

)}

<h2 className="analytics-list-title">Recent Detections</h2>

<ul className="analytics-list">

  {history.slice(-5).reverse().map((item, index) => (

    <li key={index} className="analytics-list-item">
      <span className="analytics-list-emotion">{item.emotion}</span>
      <span className="analytics-list-time">{item.time}</span>
    </li>
  ))}
</ul>

</div>
)}
export default EmotionTimeline;