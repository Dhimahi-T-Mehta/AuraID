import cv2

FRAME_WIDTH = 1280
FRAME_HEIGHT = 720

cap = cv2.VideoCapture(0)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT)


def get_camera():
    return cap