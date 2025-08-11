import React, { useState } from 'react';
import './Login.css';

export default function Register({ onBack }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const response = await fetch('http://localhost:5131/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contrasena, rol: 'Usuario' })
      });

      if (!response.ok) {
        setError('Error al registrar');
        return;
      }

      setMensaje('Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Registrarse</h2>
        {error && <p className="login-error">{error}</p>}
        {mensaje && <p className="login-success">{mensaje}</p>}

        <label>Nombre</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Correo</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

        <label>Contraseña</label>
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />

        <button type="submit">Registrar</button>
        <button type="button" onClick={onBack}>Volver</button>
      </form>
    </div>
  );
}
