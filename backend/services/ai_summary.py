def generate_ai_summary(stats):

    emotion = stats["dominant_emotion"]

    confidence = stats["average_confidence"]

    duration = stats["session_duration"]

    predictions = stats["total_predictions"]

    faces = stats["max_faces"]

    if confidence >= 85:
        quality = (
            "The facial analysis maintained excellent confidence "
            "throughout the session."
        )

    elif confidence >= 70:
        quality = (
            "The model maintained good prediction confidence."
        )

    elif confidence >= 50:
        quality = (
            "Prediction confidence was moderate with occasional uncertainty."
        )

    else:
        quality = (
            "Lighting or facial positioning reduced prediction confidence."
        )

    if emotion in ["Happy", "Surprise"]:

        mood = (
            "The participant displayed a predominantly positive emotional state."
        )

    elif emotion == "Neutral":

        mood = (
            "The participant remained emotionally stable for most of the session."
        )

    elif emotion in ["Angry", "Fear", "Sad"]:

        mood = (
            "The session was dominated by negative emotional expressions."
        )

    else:

        mood = (
            "Multiple emotional states were observed throughout the session."
        )

    return (
        f"This AuraID analysis lasted {duration} and processed "
        f"{predictions} facial predictions. "
        f"The dominant detected emotion was {emotion}. "
        f"{mood} "
        f"{quality} "
        f"The system tracked up to {faces} face(s) simultaneously."
    )