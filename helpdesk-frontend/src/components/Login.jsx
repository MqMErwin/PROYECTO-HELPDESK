import React, { useState } from 'react';
import './Login.css'; // Asegúrate de crear este archivo
import logoEmi from '../assets/ESCUELA-MILITAR-DE-INGENIERIA.png';


export default function Login({ onLogin, onShowRegister }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5131/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña: contrasena })
      });

      if (!response.ok) {
        setError('Credenciales inválidas');
        return;
      }

      const data = await response.json();
      onLogin(data.token, data.role || 'Usuario');
    } catch (err) {
      setError('Error de conexión');
    }
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
        <button type="button" onClick={onShowRegister}>Registrarse</button>
      </form>
    </div>
  );
}
