import cv2
import numpy as np


def preprocess_face(face_roi):
    face_roi = cv2.equalizeHist(face_roi)
    face_roi = cv2.resize(face_roi, (64, 64))
    face_roi = cv2.GaussianBlur(face_roi, (3, 3), 0)

    roi = face_roi / 255.0

    roi = np.reshape(
        roi,
        (1, 64, 64, 1)
    )

    return roi


def draw_prediction(frame, x, y, bw, bh, label):
    cv2.rectangle(
        frame,
        (x, y),
        (x + bw, y + bh),
        (0, 255, 0),
        2
    )

    cv2.putText(
        frame,
        label,
        (x, y - 10),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 0),
        2
    )