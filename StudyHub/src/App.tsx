import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import timer from "./timer";
import './styles.css';  

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
       <Route path="/timer" element={<timer />} />
    </Routes>
  );
}
