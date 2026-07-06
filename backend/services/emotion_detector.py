import os
import cv2
import mediapipe as mp
import numpy as np
from tensorflow.keras.models import load_model
from collections import deque

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "emotion_model.h5"
)

model = load_model(MODEL_PATH, compile=False)

# --------------------------------------------------
# MediaPipe Face Detection
# --------------------------------------------------

mp_face = mp.solutions.face_detection

face_detection = mp_face.FaceDetection(
    model_selection=1,
    min_detection_confidence=0.6
)

# --------------------------------------------------
# Emotion Labels
# --------------------------------------------------

emotion_labels = [
    "Angry",
    "Disgust",
    "Fear",
    "Happy",
    "Sad",
    "Surprise",
    "Neutral"
]
# --------------------------------------------------
# Shared Analytics Dictionary
# --------------------------------------------------

latest_prediction = {
    "emotion": "--",
    "confidence": 0,
    "faces": 0,
    "fps": 0
}

cap = cv2.VideoCapture(0)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

emotion_queue = deque(maxlen=7)

emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']


def get_latest_prediction():
    return latest_prediction

def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = face_detection.process(rgb)

        if results.detections:
            for detection in results.detections:
                bbox = detection.location_data.relative_bounding_box

                h, w, _ = frame.shape
                x = int(bbox.xmin * w)
                y = int(bbox.ymin * h)
                bw = int(bbox.width * w)
                bh = int(bbox.height * h)

                if x < 0 or y < 0 or x + bw > w or y + bh > h:
                    continue

                face_roi = gray[y:y+bh, x:x+bw]
                if face_roi.size == 0:
                    continue

                face_roi = cv2.equalizeHist(face_roi)
                face_roi = cv2.resize(face_roi, (64, 64))
                face_roi = cv2.GaussianBlur(face_roi, (3, 3), 0)
                roi = face_roi / 255.0
                roi = np.reshape(roi, (1, 64, 64, 1))

                prediction = model.predict(roi, verbose=0)
                confidence = np.max(prediction)
                emotion_index = np.argmax(prediction)
                
                latest_prediction["emotion"] = emotion_labels[emotion_index]
                latest_prediction["confidence"] = int(confidence * 100)
                latest_prediction["faces"] = len(results.detections)

                if confidence < 0.50:
                    label = "Analyzing..."
                else:
                    label = f"{emotion_labels[emotion_index]} ({int(confidence*100)}%)"

                cv2.rectangle(frame, (x, y), (x+bw, y+bh), (0, 255, 0), 2)
                cv2.putText(
                    frame,
                    label,
                    (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.8,
                    (0, 255, 0),
                    2
                )

        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
        _, buffer = cv2.imencode('.jpg', frame, encode_param)
        frame = buffer.tobytes()

        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n'
        )
