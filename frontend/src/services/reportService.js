const API = "http://127.0.0.1:5000";

export async function downloadReport() {

    const response = await fetch(
        `${API}/generate-report`
    );

    if (!response.ok) {

        throw new Error("Failed to generate report");

    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "AuraID_Report.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

}