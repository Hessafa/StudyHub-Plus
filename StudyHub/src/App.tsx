import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Existing pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Timer from "./timer"; // Make sure Timer is capitalized

// Survey components
import SurveyForm from "./components/SurveyForm";
import Result from "./components/Result";

import "./App.css";
import "./timer.css";

export default function App() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="App">
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
                <h1> ADHD Self-Assessment Survey</h1>
                <p>Reflect on your focus, organization, and energy patterns.</p>
              </header>

              {!result ? (
                <SurveyForm setResult={setResult} />
              ) : (
                <Result result={result} setResult={setResult} />
              )}

              <footer>
                <small>
                  ⚠️ This is not a diagnosis. Please consult a licensed clinician for
                  professional guidance.
                </small>
              </footer>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
