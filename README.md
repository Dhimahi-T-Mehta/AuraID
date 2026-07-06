# AuraID - AI Facial Expression Recognition Platform

<p align="center">
  <img src="frontend/public/favicon.png" width="120" alt="AuraID Logo">
</p>

<p align="center">
  <b>Real-Time AI-Powered Facial Expression Recognition using Deep Learning and MediaPipe</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11-blue.svg">
  <img src="https://img.shields.io/badge/React-Vite-61DAFB.svg">
  <img src="https://img.shields.io/badge/Flask-3.x-black.svg">
  <img src="https://img.shields.io/badge/TensorFlow-2.13-orange.svg">
  <img src="https://img.shields.io/badge/OpenCV-4.x-green.svg">
  <img src="https://img.shields.io/badge/MediaPipe-0.10.9-blue.svg">
  <img src="https://img.shields.io/badge/Status-Active-success.svg">
</p>

---

## Overview

AuraID is an AI-powered Facial Expression Recognition (FER) web application developed as a final-year Design Engineering project.

The application performs real-time facial expression recognition using a Convolutional Neural Network (CNN) along with MediaPipe Face Detection. AuraID provides a modern React interface with live webcam streaming and emotion prediction.

This project is currently being transformed from a simple FER demo into a complete **Emotion Intelligence & Analytics Platform**.

---

## 🚀 Latest Update

AuraID now includes a real-time analytics pipeline.

### Backend
- Refactored detection logic into a dedicated Emotion Detection Service.
- Added REST API endpoint:
  - `/video`
  - `/analytics`
- Live JSON analytics for emotion, confidence, face count and FPS (FPS placeholder).

### Frontend
- Premium dashboard UI
- Embedded live camera panel
- Live analytics cards
- Automatic polling from backend every 250ms
- Responsive dashboard layout

The frontend and backend are now fully synchronized through REST APIs.

---

## Current Features

- Real-time webcam emotion detection
- MediaPipe Face Detection
- Deep Learning CNN emotion classifier
- Live confidence percentage
- Automatic face preprocessing
- Histogram Equalization
- Gaussian Blur preprocessing
- Modern React + Vite frontend
- Glassmorphism UI
- Fullscreen detection mode
- Loading animation
- Responsive interface

---

## Tech Stack

### Frontend

- React
- Vite
- CSS3

### Backend

- Flask
- Flask-CORS
- OpenCV
- TensorFlow / Keras
- MediaPipe
- NumPy

### AI Model

- CNN Facial Expression Recognition Model
- Input Size: 64 × 64 (Grayscale)

---

## Current Project Structure

```
AuraID
│
├── backend
│   ├── app.py
│   ├── requirements.txt
│   ├── models
│   │   └── emotion_model.h5
│   ├── services
│   ├── database
│   ├── reports
│   ├── static
│   ├── templates
│   └── utils
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
├── LICENSE
├── README.md
|
└── .venv
```

---

## Current Workflow

```
Webcam
      │
      ▼
MediaPipe Face Detection
      │
      ▼
Face Cropping
      │
      ▼
Preprocessing
      │
      ▼
CNN Emotion Model
      │
      ▼
Emotion Prediction
      │
      ▼
Confidence Score
      │
      ▼
React Frontend
```

---

## Current Emotion Classes

- Angry
- Disgust
- Fear
- Happy
- Sad
- Surprise
- Neutral

---

## Project Status & Progress

### ✅ Completed

- Project Refactoring
- Premium Landing Page
- Dashboard UI
- Camera Integration
- Live Analytics API
- Real-time Emotion Cards
- Glassmorphism Dashboard

### 🚧 Next

- Session Timer
- FPS Counter
- Emotion History
- Emotion Distribution Chart
- Timeline Graph
- Report Generation
- SQLite Database
- AI Insights

---

## Installation

### Backend

```bash
cd backend

python -m venv .venv

.\.venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

Open:

```
http://localhost:5173
```

---

## Future Vision

AuraID is evolving beyond a traditional Facial Expression Recognition application.

The goal is to become an **AI Emotion Intelligence Platform** capable of:

- Real-time emotion recognition
- Emotion analytics
- Session reports
- Emotion history
- AI-generated insights
- Interactive dashboards
- Professional report generation

---

## Author

**Dhimahi T. Mehta**

Bachelor of Engineering (Information Technology)

AI • Machine Learning • Computer Vision • Full Stack Development

---

## License

This project is intended for educational and research purposes.