import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <nav>
        {/* Use Link components for navigation to prevent full page reloads */}
        <Link to="/">Home</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
      </nav>
      
      {/* The Routes component ensures only one route is rendered at a time */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;