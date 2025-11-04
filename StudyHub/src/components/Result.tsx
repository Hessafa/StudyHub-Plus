import React from "react";

export default function Result({ result, setResult }: { result: any, setResult: (r: null) => void }) {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Your Score: {result.score}</h2>
      <p>{result.message}</p>
      <button onClick={() => setResult(null)}>Retake Survey</button>
      <p style={{ fontSize: "0.9em", color: "#777", marginTop: "20px" }}>
         This is not a medical diagnosis. Please consult a licensed clinician for assessment and advice.
      </p>
    </div>
  );
}
