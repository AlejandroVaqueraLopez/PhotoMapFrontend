import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import logo from './assets/logo.PNG';

function App() {
  return (
  <>

      <Router>
        <header>
          <img src={logo} className='logo' alt="" />
          <nav>
            {/* Use Link components for navigation to prevent full page reloads */}
            <Link to="/"><a>Map</a></Link>{' '}
            <Link to="/login"><a>Login</a></Link>{' '}
            <Link to="/dashboard"><a>Dashboard</a></Link>{' '}
            <Link to="/profile"><a>Profile</a></Link>{' '}
          </nav>
        </header>
        
        {/* The Routes component ensures only one route is rendered at a time */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      
  </>

  );
}

export default App;