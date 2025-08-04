import React, { useState } from 'react';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import TechnicianDashboard from './components/TechnicianDashboard';
import AdminDashboard from './components/AdminDashboard';
import ChatBotWidget from './components/ChatBotWidget';
import Register from './components/Register';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [rol, setRol] = useState(localStorage.getItem('rol') || null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token, rol) => {
    setToken(token);
    setRol(rol);
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
  };

  const handleLogout = () => {
    setToken(null);
    setRol(null);
    localStorage.clear();
  };

  if (!token) {
    return (
      <div>
        {showRegister ? (
          <Register onBack={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
        )}
        <ChatBotWidget />
      </div>
    );
  }

  if (rol === 'Usuario') {
    return (
      <div>
        <UserDashboard onLogout={handleLogout} />
        <ChatBotWidget />
      </div>
    );
  }

  if (rol === 'Tecnico') {
    return (
      <div>
        <TechnicianDashboard onLogout={handleLogout} />
        <ChatBotWidget />
      </div>
    );
  }

  if (rol === 'Admin') {
    return (
      <div>
        <AdminDashboard onLogout={handleLogout} />
        <ChatBotWidget />
      </div>
    );
  }

  return <div>No tienes permisos</div>;
}

export default App;
