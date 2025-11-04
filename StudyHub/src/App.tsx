import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Existing pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Timer from "./timer"; // Capitalized: React components must start with uppercase

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
        {/*  Existing routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timer" element={<Timer />} />

        {/*  New survey route */}
        <Route
          path="/survey"
          element={
            !result ? (
              <SurveyForm setResult={setResult} />
            ) : (
              <Result result={result} setResult={setResult} />
            )
          }
        />
      </Routes>
    </div>
  );
}
