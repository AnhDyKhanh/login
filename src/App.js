import React from "react";
import LoginForm from "./components/LoginForm";
import LoginSuccess from "./components/LoginSuccess";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/loginsuccess" element={<LoginSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
