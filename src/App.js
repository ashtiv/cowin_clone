import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;