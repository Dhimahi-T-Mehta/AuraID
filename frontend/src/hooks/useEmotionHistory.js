import { useEffect, useState } from "react";
import { fetchHistory } from "../services/historyService";

export function useEmotionHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchHistory();
      setHistory(data);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return history;
}