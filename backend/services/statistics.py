from collections import Counter


def generate_statistics(history, latest, duration):

    if not history:
        return {
            "session_duration": "00:00",
            "dominant_emotion": "--",
            "emotion_distribution": {},
            "average_confidence": 0,
            "max_confidence": 0,
            "average_fps": 0,
            "max_faces": 0,
            "total_predictions": 0,
        }

    emotions = [
        item["emotion"]
        for item in history
    ]

    emotion_counts = Counter(emotions)

    dominant_emotion = emotion_counts.most_common(1)[0][0]

    distribution = {
        emotion: round(
            count * 100 / len(history),
            1,
        )
        for emotion, count in emotion_counts.items()
    }

    average_confidence = round(
        sum(
            item.get("confidence", 0)
            for item in history
        ) / len(history),
        1,
    )

    max_confidence = max(
        item.get("confidence", 0)
        for item in history
    )

    average_fps = round(
        sum(
            item.get("fps", 0)
            for item in history
        ) / len(history),
        1,
    )

    max_faces = max(
        item.get("faces", 0)
        for item in history
    )

    return {

        "session_duration": duration,

        "dominant_emotion": dominant_emotion,

        "emotion_distribution": distribution,

        "average_confidence": average_confidence,

        "max_confidence": max_confidence,

        "average_fps": average_fps,

        "max_faces": max_faces,

        "total_predictions": len(history),

    }