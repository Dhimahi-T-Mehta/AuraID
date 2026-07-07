const API_URL = "http://127.0.0.1:5000";

export async function fetchHistory() {
  try {
    const response = await fetch(`${API_URL}/history`);

    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}