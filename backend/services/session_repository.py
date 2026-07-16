import sqlite3
from datetime import datetime

from services.database import DB_PATH


def save_session(stats):

    print("Saving session...")
    print(stats)
    conn = sqlite3.connect(DB_PATH)

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO sessions(

            created_at,

            duration,

            dominant_emotion,

            average_confidence,

            average_fps,

            max_faces,

            total_predictions

        )

        VALUES(?,?,?,?,?,?,?)

        """,
        (

            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),

            stats["session_duration"],

            stats["dominant_emotion"],

            stats["average_confidence"],

            stats["average_fps"],

            stats["max_faces"],

            stats["total_predictions"],

        ),
    )

    conn.commit()

    conn.close()

def get_all_sessions():

    conn = sqlite3.connect(DB_PATH)

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM sessions
        ORDER BY id DESC
        """
    )

    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]