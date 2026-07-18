import os
import cv2

from services.emotion_detector import get_latest_frame


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

SNAPSHOT_DIR = os.path.join(
    BASE_DIR,
    "reports"
)

os.makedirs(
    SNAPSHOT_DIR,
    exist_ok=True
)


def save_snapshot():

    frame = get_latest_frame()

    print("Latest frame:", frame is not None)

    if frame is None:
        return None

    path = os.path.join(
        SNAPSHOT_DIR,
        "session_snapshot.jpg"
    )

    cv2.imwrite(path, frame)

    print("Snapshot saved:", path)

    return path