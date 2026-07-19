import sqlite3
from datetime import datetime

from services.database import DB_PATH, get_connection
from typing import Optional

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

def get_session_by_id(session_id: int):

    conn = sqlite3.connect(DB_PATH)

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM sessions
        WHERE id = ?
        """,
        (session_id,)
    )

    row = cursor.fetchone()

    conn.close()

    return dict(row) if row else None

def search_sessions(

        emotion=None,

        date=None,

        min_confidence=None,

        min_duration=None,

        sort_by="created_at",

        order="DESC",

    ):

        conn = get_connection()

        conn.row_factory = sqlite3.Row

        cursor = conn.cursor()

        query = "SELECT * FROM sessions WHERE 1=1"

        params = []

        if emotion:

            query += " AND dominant_emotion=?"

            params.append(emotion)

        if date:

            query += " AND DATE(created_at)=?"

            params.append(date)

        if min_confidence is not None:

            query += " AND average_confidence>=?"

            params.append(min_confidence)

        if min_duration:

            query += """
            AND (
                CAST(substr(duration,1,2) AS INTEGER)*60
                +
                CAST(substr(duration,4,2) AS INTEGER)
            ) >= ?
            """

            params.append(min_duration)

        allowed_columns = [

            "created_at",

            "average_confidence",

            "average_fps",

            "total_predictions",

            "duration",

        ]

        if sort_by not in allowed_columns:

            sort_by = "created_at"

        order = "ASC" if order == "ASC" else "DESC"

        query += f" ORDER BY {sort_by} {order}"

        cursor.execute(query, params)

        sessions = cursor.fetchall()

        conn.close()

        return [dict(session) for session in sessions]

def delete_session(session_id: int):

    conn = sqlite3.connect(DB_PATH)

    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE
        FROM sessions
        WHERE id = ?
        """,
        (session_id,)
    )

    deleted = cursor.rowcount

    conn.commit()

    conn.close()

    return deleted > 0

def delete_all_sessions():

    conn = sqlite3.connect(DB_PATH)

    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM sessions
        """
    )

    deleted = cursor.rowcount

    conn.commit()

    conn.close()

    return deleted

def compare_sessions(

    first_session_id: int,

    second_session_id: int,

):

    first = get_session_by_id(first_session_id)

    second = get_session_by_id(second_session_id)

    if not first or not second:

        return None

    return {

        "session_1": first,

        "session_2": second,

    }