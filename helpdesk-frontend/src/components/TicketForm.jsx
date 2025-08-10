import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5131/api';

function TicketForm({ token }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ titulo, descripcion })
    });

    if (response.ok) {
      const data = await response.json();
      setMensaje(`Ticket creado con ID ${data.id}`);
      setTitulo('');
      setDescripcion('');
    } else {
      setMensaje('Error al crear el ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nuevo Ticket</h2>
      <div>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <button type="submit">Crear</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

export default TicketForm;
