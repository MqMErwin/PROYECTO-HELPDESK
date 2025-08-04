import React, { useState } from 'react';
import './Login.css'; // Asegúrate de crear este archivo
import ChatBotWidget from '../components/ChatBotWidget';
import logoEmi from '../assets/ESCUELA-MILITAR-DE-INGENIERIA.png';


export default function Login({ onLogin }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    const users = [
      { correo: 'estudiante', contrasena: '1234', rol: 'Usuario' },
      { correo: 'tecnico', contrasena: '1234', rol: 'Tecnico' },
      { correo: 'admin', contrasena: '1234', rol: 'Admin' }
    ];
  
    const user = users.find(u => u.correo === correo && u.contrasena === contrasena);
  
    if (!user) {
      setError('Credenciales inválidas');
      return;
    }
  
    onLogin('fake-token', user.rol);
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
      <img src={logoEmi} alt="Logo EMI" className="login-logo" />

        <h2 className="login-title">Iniciar sesión</h2>
        {error && <p className="login-error">{error}</p>}

        <label>Usuario</label>
        <input
          type="text"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
