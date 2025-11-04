import React from "react";
import "./Result.css";

export default function Result({ result, setResult }: { result: any, setResult: (r: null) => void }) {
  return (
    <div className="result-container">
      <div className="result-card">
        <h2>Your Score: <span>{result.score}</span></h2>
        <p>{result.message}</p>
        <button onClick={() => setResult(null)} className="retake-btn">
          Retake Survey
        </button>
      </div>
    </div>
  );
}
