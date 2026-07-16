import os

import matplotlib.pyplot as plt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CHART_DIR = os.path.join(BASE_DIR, "charts")

os.makedirs(CHART_DIR, exist_ok=True)


def generate_pie_chart(distribution):

    if not distribution:
        return None

    plt.style.use("default")

    labels = list(distribution.keys())
    values = list(distribution.values())

    colors = [
        "#38BDF8",
        "#2563EB",
        "#0EA5E9",
        "#14B8A6",
        "#8B5CF6",
        "#F59E0B",
        "#EF4444",
    ]

    plt.figure(figsize=(6, 6))

    plt.pie(
        values,
        labels=labels,
        colors=colors[:len(values)],
        autopct="%1.1f%%",
        startangle=90,
        pctdistance=0.75,
        wedgeprops={
            "linewidth": 2,
            "edgecolor": "white",
        },
    )

    plt.title(
        "Emotion Distribution",
        fontsize=15,
        fontweight="bold",
        color="#1E293B",
    )

    plt.tight_layout()

    output = os.path.join(
        CHART_DIR,
        "pie_chart.png",
    )

    plt.savefig(
        output,
        dpi=250,
        bbox_inches="tight",
    )

    plt.close()

    return output


def generate_timeline_chart(history):

    if not history:
        return None

    emotion_order = {
        "Angry": 1,
        "Disgust": 2,
        "Fear": 3,
        "Sad": 4,
        "Neutral": 5,
        "Happy": 6,
        "Surprise": 7,
    }

    x = []
    y = []

    for item in history:

        x.append(item["time"])

        y.append(
            emotion_order.get(
                item["emotion"],
                0,
            )
        )

    plt.figure(figsize=(10, 4.5))

    plt.plot(
        y,
        color="#2563EB",
        linewidth=3,
        marker="o",
        markersize=4,
    )

    # show only every Nth timestamp
    total = len(x)

    step = max(1, total // 10)

    ticks = list(range(0, total, step))

    plt.xticks(
        ticks,
        [x[i] for i in ticks],
        rotation=30,
    )

    plt.yticks(
        list(emotion_order.values()),
        list(emotion_order.keys()),
    )

    plt.grid(
        linestyle="--",
        alpha=0.35,
    )

    plt.title(
        "Emotion Timeline",
        fontsize=15,
        fontweight="bold",
        color="#1E293B",
    )

    plt.tight_layout()

    output = os.path.join(
        CHART_DIR,
        "timeline_chart.png",
    )

    plt.savefig(
        output,
        dpi=250,
        bbox_inches="tight",
    )

    plt.close()

    return output