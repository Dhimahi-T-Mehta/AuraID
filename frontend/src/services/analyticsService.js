const API_URL = "http://127.0.0.1:5000";

export async function fetchAnalytics() {
    try {
        const response = await fetch(`${API_URL}/analytics`);

        if (!response.ok) {
            throw new Error("Failed to fetch analytics");
        }

        return await response.json();
    } catch (error) {
        console.error(error);

        return {
            emotion: "--",
            confidence: 0,
            faces: 0,
            fps: 0
        };
    }
}