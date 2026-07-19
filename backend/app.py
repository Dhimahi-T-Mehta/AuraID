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
from services.session_repository import (
    save_session,
    get_all_sessions,
    get_session_by_id,
    search_sessions,
    delete_session,
    delete_all_sessions,
    compare_sessions,
)
from services.snapshot import save_snapshot
from services.chart_generator import (
    generate_pie_chart,
    generate_timeline_chart,
)

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

    stats["duration"] = stats["session_duration"]

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

    snapshot_path = save_snapshot()

    filepath = generate_pdf_report(
        statistics,
        history,
        snapshot_path,
    )

    save_session(statistics)

    return send_file(
        filepath,
        as_attachment=True,
    )

@app.route("/sessions")
def sessions():

    return jsonify(get_all_sessions())

@app.route("/sessions/search")

def search():

    emotion = request.args.get("emotion")

    date = request.args.get("date")

    confidence = request.args.get("confidence")

    duration = request.args.get("duration")

    sort = request.args.get("sort")

    order = request.args.get("order", "DESC")

    sessions = search_sessions(

        emotion=emotion,

        date=date,

        min_confidence=float(confidence)

        if confidence else None,

        min_duration=int(duration)

        if duration else None,

        sort_by=sort,

        order=order,

    )

    return jsonify(sessions)

@app.route("/sessions/<int:session_id>")
def get_session(session_id):

    session = get_session_by_id(session_id)

    if session is None:

        return jsonify({
            "status": "error",
            "message": "Session not found"
        }), 404

    return jsonify(session)

@app.route(
    "/sessions/<int:session_id>",
    methods=["DELETE"],
)
def remove_session(session_id):

    deleted = delete_session(session_id)

    if not deleted:

        return jsonify({

            "status": "error",

            "message": "Session not found",

        }), 404

    return jsonify({

        "status": "success",

        "message": "Session deleted",

    })

@app.route(
    "/sessions",
    methods=["DELETE"],
)
def remove_all_sessions():

    deleted = delete_all_sessions()

    return jsonify({

        "status": "success",

        "deleted": deleted,

    })

@app.route(
    "/sessions/compare",
    methods=["POST"],
)
def compare():

    data = request.get_json()

    first = data.get("session_1")

    second = data.get("session_2")

    result = compare_sessions(

        first,

        second,

    )

    if result is None:

        return jsonify({

            "status": "error",

            "message": "Session not found",

        }), 404

    return jsonify(result)

@app.route("/snapshot")
def snapshot():

    path = save_snapshot()

    return jsonify({
        "path": path
    })

@app.route("/generate-charts")
def generate_charts():

    history = list(get_emotion_history())

    distribution = {}

    for item in history:

        emotion = item["emotion"]

        distribution[emotion] = (
            distribution.get(emotion, 0) + 1
        )

    total = sum(distribution.values())

    if total > 0:

        distribution = {

            emotion: round(
                count * 100 / total,
                1,
            )

            for emotion, count in distribution.items()

        }

    pie = generate_pie_chart(distribution)

    timeline = generate_timeline_chart(history)

    return {

        "status": "success",

        "pie_chart": pie,

        "timeline_chart": timeline,

    }

if __name__ == "__main__":
    app.run(debug=True)