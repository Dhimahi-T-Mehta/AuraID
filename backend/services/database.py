import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DB_PATH = os.path.join(BASE_DIR, "auraid.db")


def get_connection():
    return sqlite3.connect(DB_PATH)


def initialize_database():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            created_at TEXT,

            duration TEXT,

            dominant_emotion TEXT,

            average_confidence REAL,

            average_fps REAL,

            max_faces INTEGER,

            total_predictions INTEGER

        )
    """)

    conn.commit()
    conn.close()