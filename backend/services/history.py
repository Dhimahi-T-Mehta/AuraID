import time
from collections import deque, Counter

emotion_history = deque(maxlen=300)
emotion_queue = deque(maxlen=7)

session_start = time.time()
last_saved_second = -1


def add_prediction(emotion):
    global last_saved_second

    elapsed = int(time.time() - session_start)

    if elapsed == last_saved_second:
        return

    last_saved_second = elapsed

    timestamp = f"{elapsed//60:02}:{elapsed%60:02}"

    emotion_history.append({
        "time": timestamp,
        "emotion": emotion
    })


def add_smoothing(emotion):
    emotion_queue.append(emotion)


def get_smoothed():
    if not emotion_queue:
        return "--"

    return Counter(emotion_queue).most_common(1)[0][0]


def get_history():
    return list(emotion_history)

def get_session_duration():
    return int(time.time() - session_start)

def reset_history():
    global session_start
    global last_saved_second

    emotion_history.clear()
    emotion_queue.clear()

    session_start = time.time()
    last_saved_second = -1