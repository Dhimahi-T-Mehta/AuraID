const API_URL = "http://127.0.0.1:5000";

export async function resetSession() {
  try {
    const response = await fetch(`${API_URL}/reset-session`, {
      method: "POST",
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}