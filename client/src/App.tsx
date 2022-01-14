import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TestPage from "./components/pages/TestPage";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
