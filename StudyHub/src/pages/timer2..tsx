import React, { useEffect, useState, useRef } from 'react';

const API_BASE = 'http://localhost:8000/api';

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const formatTime = (s: number): string => {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const fetchStatus = async () => {
    const res = await fetch(`${API_BASE}/status`);
    const data = await res.json();
    setSeconds(data.seconds);
    setIsRunning(data.running);
  };

  const start = async () => {
    await fetch(`${API_BASE}/start`, { method: 'POST' });
    setIsRunning(true);
  };

  const pause = async () => {
    await fetch(`${API_BASE}/pause`, { method: 'POST' });
    setIsRunning(false);
  };

  const restart = async () => {
    await fetch(`${API_BASE}/restart`, { method: 'POST' });
    setIsRunning(false);
    setSeconds(0);
  };

  const tick = async () => {
    const res = await fetch(`${API_BASE}/tick`, { method: 'POST' });
    const data = await res.json();
    setSeconds(data.seconds);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        tick();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return (
    <div className="timer-container">
      <h1>{formatTime(seconds)}</h1>
      <div>
        <button onClick={start} disabled={isRunning}>Start</button>
        <button onClick={pause} disabled={!isRunning}>Pause</button>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
};

export default Timer;
