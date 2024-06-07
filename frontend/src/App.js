import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
