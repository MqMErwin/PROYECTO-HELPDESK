import React, { useState } from 'react';
import Login from './components/Login';
import ChatBotWidget from './components/ChatBotWidget';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [rol, setRol] = useState(localStorage.getItem('rol') || null);
  const [showRegister, setShowRegister] = useState(false);
  const validRoles = ['Solicitante', 'Tecnico', 'Administrador'];

  const handleLogin = (token, rol) => {
    const normalizedRole = rol
      ? rol.charAt(0).toUpperCase() + rol.slice(1).toLowerCase()
      : '';
    setToken(token);
    setRol(normalizedRole);
    localStorage.setItem('token', token);
    localStorage.setItem('rol', normalizedRole);
  };

  const handleLogout = () => {
    setToken(null);
    setRol(null);
    localStorage.clear();
  };

  if (!token || !validRoles.includes(rol)) {
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

  return (
    <>
      <Dashboard onLogout={handleLogout} token={token} role={rol} />
      <ChatBotWidget />
    </>
  );
}

export default App;
