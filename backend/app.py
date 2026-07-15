from flask import Flask, Response, jsonify, request
from flask_cors import CORS

from services.emotion_detector import (
    reset_session,
    generate_frames,
)
from services.analytics import get_prediction
from services.history import get_history

app = Flask(__name__)
CORS(app)


@app.route("/video")
def video():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )

@app.route("/analytics")
def analytics():
    return jsonify(get_prediction())

@app.route("/history")
def history():
    return jsonify(get_history())

@app.route("/reset-session", methods=["POST"])
def reset():
    return jsonify(reset_session())

if __name__ == "__main__":
    app.run(debug=True)