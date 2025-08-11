import React, { useState } from 'react';
import Login from './components/Login';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import ChatBotWidget from './components/ChatBotWidget';
import Register from './components/Register';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [rol, setRol] = useState(localStorage.getItem('rol') || null);
  const [showRegister, setShowRegister] = useState(false);
  const validRoles = ['Solicitante', 'Tecnico', 'Administrador'];

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
      <div>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <TicketForm token={token} />
        <TicketList token={token} role={rol} />
        <ChatBotWidget />
      </div>
    );
  }

  if (rol === 'Tecnico') {
    return (
      <div>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <TicketList token={token} role={rol} />
        <ChatBotWidget />
      </div>
    );
  }

  if (rol === 'Administrador') {
    return (
      <div>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <TicketList token={token} role={rol} />
        <ChatBotWidget />
      </div>
    );
  }

  return <div>No tienes permisos</div>;
}

export default App;
