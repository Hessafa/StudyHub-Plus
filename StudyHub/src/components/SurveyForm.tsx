import React, { useState } from "react";
import axios from "axios";

const questions = [
  "How often do you have trouble focusing on schoolwork or lectures?",
  "How often do you get distracted by small things or noises?",
  "Do you find it hard to stay organized (keeping track of tasks, materials, deadlines)?",
  "How often do you feel restless or have trouble sitting still?",
  "How often do you procrastinate or start tasks at the last minute?",
];

export default function SurveyForm({ setResult }: { setResult: (r: any) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));

  const handleChange = (index: number, value: number) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.includes(null)) {
      alert("Please answer all questions.");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/adhd-survey", { answers });
      setResult(res.data);
    } catch (err) {
      alert("Failed to connect to backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          <p><strong>{i + 1}. {q}</strong></p>
          <label><input type="radio" name={`q${i}`} value="3" onChange={() => handleChange(i, 3)} /> Often</label>{" "}
          <label><input type="radio" name={`q${i}`} value="2" onChange={() => handleChange(i, 2)} /> Sometimes</label>{" "}
          <label><input type="radio" name={`q${i}`} value="1" onChange={() => handleChange(i, 1)} /> Rarely</label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
