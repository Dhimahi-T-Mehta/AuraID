import os
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORT_DIR = os.path.join(BASE_DIR, "reports")

os.makedirs(REPORT_DIR, exist_ok=True)


def generate_pdf_report(statistics):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    filename = f"AuraID_Report_{timestamp}.pdf"

    filepath = os.path.join(REPORT_DIR, filename)

    doc = SimpleDocTemplate(filepath)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "<b><font size=20>AuraID</font></b>",
            styles["Title"],
        )
    )

    elements.append(
        Paragraph(
            "Facial Expression Recognition Report",
            styles["Heading2"],
        )
    )

    elements.append(Spacer(1, 20))

    table_data = [
        ["Metric", "Value"],
        ["Session Duration", statistics["session_duration"]],
        ["Dominant Emotion", statistics["dominant_emotion"]],
        ["Average Confidence", f'{statistics["average_confidence"]}%'],
        ["Maximum Confidence", f'{statistics["max_confidence"]}%'],
        ["Average FPS", statistics["average_fps"]],
        ["Maximum Faces", statistics["max_faces"]],
        ["Samples Collected", statistics["total_predictions"]],
    ]

    table = Table(table_data)

    table.setStyle(
        TableStyle([
            ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#00C6A9")),
            ("TEXTCOLOR", (0,0), (-1,0), colors.white),
            ("GRID", (0,0), (-1,-1), 1, colors.grey),
            ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
            ("BOTTOMPADDING", (0,0), (-1,0), 12),
            ("BACKGROUND", (0,1), (-1,-1), colors.whitesmoke),
        ])
    )

    elements.append(table)

    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            "<b>Emotion Distribution</b>",
            styles["Heading2"],
        )
    )

    for emotion, percentage in statistics["emotion_distribution"].items():
        elements.append(
            Paragraph(
                f"{emotion}: {percentage}%",
                styles["BodyText"],
            )
        )

    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            f"Generated on: {datetime.now()}",
            styles["Italic"],
        )
    )

    doc.build(elements)

    return filename