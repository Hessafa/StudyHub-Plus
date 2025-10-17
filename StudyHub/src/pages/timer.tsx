import React, { useState, useEffect, useRef } from 'react';

const API = 'http://localhost:8000/api';

const Timer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const formatTime = (s: number) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const start = async () => {
    await fetch(`${API}/start`, { method: 'POST' });
    setRunning(true);
  };

  const restart = async () => {
    await fetch(`${API}/restart`, { method: 'POST' });
    setRunning(false);
    setSeconds(25 * 60);
  };

  const tick = async () => {
    const res = await fetch(`${API}/tick`, { method: 'POST' });
    const data = await res.json();
    setSeconds(data.seconds);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        tick();
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [running]);

  return (
    <div className="timer-container">
      <h1>{formatTime(seconds)}</h1>
      <button onClick={start} disabled={running}>Start</button>
      <button onClick={restart}>Restart</button>
    </div>
  );
};

export default Timer;
