function Hero({ onStart }) {
  return (
    <div className="hero-card">
      <h1>AuraID</h1>
      <p>Facial Expression Recognition</p>

      <button className="primary-btn" onClick={onStart}>
        Start Detection
      </button>
    </div>
  );
}

export default Hero;