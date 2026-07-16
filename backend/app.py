from flask import Flask, Response, jsonify, request, send_file
from flask_cors import CORS
import os

from services.emotion_detector import (
    generate_frames,
    reset_session,
    get_latest_prediction,
    get_emotion_history,
)

from services.statistics import generate_statistics
from services.report_generator import generate_pdf_report
from services.database import initialize_database
from services.session_repository import save_session
from services.session_repository import get_all_sessions

app = Flask(__name__)
CORS(app)

initialize_database()

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
    return jsonify(list(get_emotion_history()))

@app.route("/reset-session", methods=["POST"])
def reset():
    return jsonify(reset_session())

@app.route("/statistics")
def statistics():

    history = list(get_emotion_history())
    latest = get_latest_prediction()

    duration = (
        history[-1]["time"]
        if history
        else "00:00"
    )

    stats = generate_statistics(
        history,
        latest,
        duration,
    )

    statistics["duration"] = statistics["session_duration"]

    return jsonify(stats)

@app.route("/generate-report")
def report():

    history = list(get_emotion_history())

    latest = get_latest_prediction()

    duration = (
        history[-1]["time"]
        if history
        else "00:00"
    )

    statistics = generate_statistics(
        history,
        latest,
        duration,
    )

    filename = generate_pdf_report(statistics)

    save_session(statistics)

    return send_file(
        filename,
        as_attachment=True
    )

@app.route("/sessions")
def sessions():

    return jsonify(get_all_sessions())

if __name__ == "__main__":
    app.run(debug=True)