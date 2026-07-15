latest_prediction = {
    "emotion": "--",
    "confidence": 0,
    "faces": 0,
    "fps": 0,
    "width": 1280,
    "height": 720,
    "model": "FER CNN"
}


def get_prediction():
    return latest_prediction


def update_prediction(**kwargs):
    latest_prediction.update(kwargs)


def reset_prediction():
    latest_prediction.update({
        "emotion": "--",
        "confidence": 0,
        "faces": 0,
        "fps": 0,
        "width": 1280,
        "height": 720,
        "model": "FER CNN"
    })