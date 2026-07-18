import os
from datetime import datetime

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from services.chart_generator import (
    generate_pie_chart,
    generate_timeline_chart,
)

from services.ai_summary import generate_ai_summary

# --------------------------------------------------
# Colors
# --------------------------------------------------

PRIMARY = HexColor("#2563EB")
CYAN = HexColor("#38BDF8")
NAVY = HexColor("#0F172A")
LIGHT = HexColor("#F8FAFC")

GREEN = HexColor("#22C55E")
ORANGE = HexColor("#F59E0B")
PURPLE = HexColor("#8B5CF6")

CARD_BG = HexColor("#F8FAFC")
CARD_BORDER = HexColor("#D7E3F4")
TEXT = HexColor("#1E293B")
SUBTEXT = HexColor("#64748B")

# --------------------------------------------------
# Paths
# --------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

LOGO_PATH = os.path.join(
    BASE_DIR,
    "assets",
    "logo.png",
)

REPORT_DIR = os.path.join(
    BASE_DIR,
    "reports",
)

os.makedirs(REPORT_DIR, exist_ok=True)

# --------------------------------------------------
# Cover
# --------------------------------------------------

def draw_cover(c):

    width, height = A4

    c.setFillColor(PRIMARY)
    c.rect(
        0,
        height - 90,
        width,
        90,
        fill=1,
        stroke=0,
    )

    if os.path.exists(LOGO_PATH):

        c.drawImage(
            LOGO_PATH,
            40,
            height - 75,
            width=50,
            height=50,
            mask="auto",
            preserveAspectRatio=True,
        )

    c.setFillColor(white)

    c.setFont(
        "Helvetica-Bold",
        28,
    )

    c.drawString(
        105,
        height - 45,
        "AuraID",
    )

    c.setFont(
        "Helvetica",
        12,
    )

    c.drawString(
        107,
        height - 65,
        "AI Emotion Intelligence Platform",
    )

    c.setFillColor(NAVY)

    c.setFont(
        "Helvetica-Bold",
        22,
    )

    c.drawString(
        40,
        height - 135,
        "Facial Expression Analysis Report",
    )

    c.setFont(
        "Helvetica",
        12,
    )

    c.drawString(
        40,
        height - 160,
        datetime.now().strftime(
            "Generated on %d %B %Y • %H:%M"
        ),
    )

# --------------------------------------------------
# Metric Card
# --------------------------------------------------

def draw_metric_card(

    c,
    x,
    y,
    title,
    value,
    color,

):

    c.setFillColor(color)

    c.roundRect(

        x,
        y,
        170,
        70,
        12,

        fill=1,
        stroke=0,

    )

    c.setFillColor(white)

    c.setFont(
        "Helvetica",
        10,
    )

    c.drawString(
        x + 12,
        y + 48,
        title,
    )

    c.setFont(
        "Helvetica-Bold",
        20,
    )

    c.drawString(
        x + 12,
        y + 20,
        str(value),
    )

def draw_card(
    c,
    x,
    y,
    width,
    height,
    fill=CARD_BG,
    border=CARD_BORDER,
):
    """
    Draws a reusable rounded analytics card.
    """

    c.setFillColor(fill)

    c.setStrokeColor(border)

    c.setLineWidth(1)

    c.roundRect(
        x,
        y,
        width,
        height,
        12,
        fill=1,
        stroke=1,
    )

def draw_section_title(
    c,
    x,
    y,
    title,
):
    """
    Professional section title.
    """

    c.setFillColor(PRIMARY)

    c.setFont(
        "Helvetica-Bold",
        15,
    )

    c.drawString(
        x,
        y,
        title,
    )

    c.setStrokeColor(PRIMARY)

    c.setLineWidth(1)

    c.line(
        x,
        y - 6,
        x + 170,
        y - 6,
    )

def draw_summary_card(
    c,
    summary,
):
    draw_card(
        c,
        40,
        640,
        515,
        95,
    )

    draw_section_title(
        c,
        55,
        720,
        "AI Summary",
    )

    text = c.beginText()

    text.setTextOrigin(
        60,
        690,
    )

    text.setFillColor(TEXT)

    text.setFont(
        "Helvetica",
        11,
    )

    for line in summary.split(". "):

        text.textLine(
            line.strip()
        )

    c.drawText(text)

def draw_chart_card(
    c,
    title,
    image_path,
    x,
    y,
):
    draw_card(
        c,
        x,
        y,
        240,
        260,
    )

    draw_section_title(
        c,
        x + 12,
        y + 240,
        title,
    )

    if os.path.exists(image_path):

        c.drawImage(
            image_path,
            x + 15,
            y + 15,
            width=210,
            height=185,
            preserveAspectRatio=True,
        )

def draw_snapshot_card(
    c,
    snapshot_path,
):
    draw_card(
        c,
        40,
        40,
        240,
        240,
    )

    draw_section_title(
        c,
        55,
        260,
        "Session Snapshot",
    )

    if snapshot_path and os.path.exists(snapshot_path):

        c.drawImage(
            snapshot_path,
            60,
            60,
            width=200,
            height=160,
            preserveAspectRatio=True,
            mask="auto",
        )

def draw_metrics_grid(
    c,
    statistics,
):
    draw_card(
        c,
        300,
        40,
        255,
        240,
    )

    draw_section_title(
        c,
        315,
        260,
        "Session Metrics",
    )

    metrics = [

        ("Duration", statistics["session_duration"]),

        ("Emotion", statistics["dominant_emotion"]),

        ("Confidence", f'{statistics["average_confidence"]}%'),

        ("Max Conf.", f'{statistics["max_confidence"]}%'),

        ("FPS", statistics["average_fps"]),

        ("Faces", statistics["max_faces"]),

        ("Predictions", statistics["total_predictions"]),
    ]

    y = 225

    for title, value in metrics:

        c.setFillColor(SUBTEXT)

        c.setFont(
            "Helvetica",
            10,
        )

        c.drawString(
            320,
            y,
            title,
        )

        c.setFillColor(TEXT)

        c.setFont(
            "Helvetica-Bold",
            12,
        )

        c.drawRightString(
            535,
            y,
            str(value),
        )

        y -= 28

def draw_statistics(c, statistics):

    c.setFillColor(NAVY)

    c.setFont(
        "Helvetica-Bold",
        16,
    )

    c.drawString(
        40,
        350,
        "Session Statistics",
    )

    c.setFont(
        "Helvetica",
        12,
    )

    stats = [

        (
            "Maximum Confidence",
            f'{statistics["max_confidence"]}%'
        ),

        (
            "Average FPS",
            statistics["average_fps"]
        ),

        (
            "Total Predictions",
            statistics["total_predictions"]
        ),

    ]

    y = 325

    for title, value in stats:

        c.drawString(
            55,
            y,
            f"{title}: {value}",
        )

        y -= 22


def draw_distribution(c, statistics):

    c.setFont(
        "Helvetica-Bold",
        16,
    )

    c.drawString(
        40,
        220,
        "Emotion Distribution",
    )

    c.setFont(
        "Helvetica",
        12,
    )

    y = 195

    for emotion, percent in statistics[
        "emotion_distribution"
    ].items():

        c.drawString(
            55,
            y,
            f"{emotion}: {percent} %",
        )

        y -= 18


# --------------------------------------------------
# Footer
# --------------------------------------------------

def draw_footer(c):

    width, _ = A4

    c.setStrokeColor(PRIMARY)

    c.line(
        40,
        35,
        width - 40,
        35,
    )

    c.setFont(
        "Helvetica",
        9,
    )

    c.setFillColor(HexColor("#666666"))

    c.drawString(
        40,
        20,
        "AuraID • AI Emotion Intelligence Platform • © 2026",
    )

    c.drawRightString(
        width - 40,
        20,
        f"Page {c.getPageNumber()}",
    )

# --------------------------------------------------
# Main Report
# --------------------------------------------------

def generate_pdf_report(
    statistics,
    history,
    snapshot_path=None,
):

    timestamp = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    filename = (
        f"AuraID_Report_{timestamp}.pdf"
    )

    filepath = os.path.join(
        REPORT_DIR,
        filename,
    )

    c = canvas.Canvas(
        filepath,
        pagesize=A4,
    )

    width, height = A4

    distribution_chart = generate_pie_chart(
        statistics["emotion_distribution"]
    )

    timeline_chart = generate_timeline_chart(
        history
    )

    summary = generate_ai_summary(statistics)


    # ---------------- Cover ----------------

    draw_cover(c)

    # ---------------- Heading ----------------

    c.setFillColor(NAVY)

    c.setFont(
        "Helvetica-Bold",
        18,
    )

    c.drawString(
        40,
        610,
        "Executive Summary",
    )

    # ---------------- Cards ----------------

    draw_metric_card(

        c,

        40,
        510,

        "Duration",

        statistics["session_duration"],

        PRIMARY,

    )

    draw_metric_card(

        c,

        230,
        510,

        "Emotion",

        statistics["dominant_emotion"],

        GREEN,

    )

    draw_metric_card(

        c,

        40,
        420,

        "Confidence",

        f'{statistics["average_confidence"]}%',

        ORANGE,

    )

    draw_metric_card(

        c,

        230,
        420,

        "Faces",

        statistics["max_faces"],

        PURPLE,

    )

    # ---------------- Statistics ----------------
    draw_statistics(
        c,
        statistics,
    )

    # ---------------- Emotion Distribution ----------------

    draw_distribution(
        c,
        statistics,
    )
    # ---------------- Footer ----------------

    draw_footer(c)

    # ---------------- Page 2 ----------------

    c.showPage()

    draw_summary_card(
        c,
        summary,
    )

    draw_chart_card(
        c,
        "Emotion Distribution",
        distribution_chart,
        40,
        320,
    )

    draw_chart_card(
        c,
        "Emotion Timeline",
        timeline_chart,
        300,
        320,
    )

    draw_snapshot_card(
        c,
        snapshot_path,
    )

    draw_metrics_grid(
        c,
        statistics,
    )

    draw_footer(c)

    c.save()

    return filepath