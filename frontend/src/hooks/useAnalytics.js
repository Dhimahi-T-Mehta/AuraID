import { fetchAnalytics } from "../services/analyticsService";
import { useEffect, useState } from "react";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState({
    emotion: "--",
    confidence: 0,
    faces: 0,
    fps: 0,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
        const data = await fetchAnalytics();
        setAnalytics(data);
    }, 250); 

    return () => clearInterval(interval);
  }, []);

    return analytics;
}