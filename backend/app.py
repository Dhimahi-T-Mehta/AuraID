from flask import Flask, Response, jsonify
from flask_cors import CORS

from services.emotion_detector import (
    generate_frames,
    get_latest_prediction,
    get_emotion_history
)

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
    return jsonify(get_latest_prediction())

@app.route("/history")
def history():
    return jsonify(get_emotion_history())

if __name__ == "__main__":
    app.run(debug=True)