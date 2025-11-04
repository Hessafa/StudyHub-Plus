import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Existing pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Timer from "./timer";

// Survey components
import SurveyForm from "./components/SurveyForm";
import Result from "./components/Result";

import "./App.css";
import "./timer.css";

export default function App() {
  const [result, setResult] = useState<any>(null);
  const [focusMode, setFocusMode] = useState(false);

  return (
    <div className={`App ${focusMode ? "focus-mode" : ""}`}>
      {/* Focus Mode Toggle */}
      <button
        className="focus-toggle"
        onClick={() => setFocusMode((prev) => !prev)}
      >
        {focusMode ? "Exit Focus Mode" : "Enable Focus Mode"}
      </button>

      {/* Optional background audio for Focus Mode */}
      {focusMode && (
        <audio autoPlay loop>
          <source src="/cafe-white-noise.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timer" element={<Timer />} />

        {/* Survey route */}
        <Route
          path="/survey"
          element={
            <div>
              <header>
                <h1>ADHD Self-Assessment Survey</h1>
                <p>Reflect on your focus, organization, and energy patterns.</p>
              </header>

              {!result ? (
                <SurveyForm setResult={setResult} />
              ) : (
                <Result result={result} setResult={setResult} />
              )}

              <footer>
                <small>
                  This survey is for self-reflection only. Please consult a licensed clinician
                  for professional guidance.
                </small>
              </footer>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
