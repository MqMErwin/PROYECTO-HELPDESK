import React, { useState } from 'react';
import Login from './components/Login';
import ChatBotWidget from './components/ChatBotWidget';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import TechnicianDashboard from './components/TechnicianDashboard';
import UserDashboard from './components/UserDashboard';
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

  if (rol === 'Solicitante') {
    return (
      <>
        <UserDashboard onLogout={handleLogout} token={token} role={rol} />
        <ChatBotWidget />
      </>
    );
  }

  if (rol === 'Tecnico') {
    return (
      <>
        <TechnicianDashboard onLogout={handleLogout} token={token} role={rol} />
        <ChatBotWidget />
      </>
    );
  }

  if (rol === 'Administrador') {
    return (
      <>
        <AdminDashboard onLogout={handleLogout} token={token} role={rol} />
        <ChatBotWidget />
      </>
    );
  }

  return <div>No tienes permisos</div>;
}

export default App;
