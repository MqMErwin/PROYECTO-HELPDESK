import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5131/api';

function TicketList({ token, role }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch(`${API_URL}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    };
    fetchTickets();
  }, [token]);

  const handleAssign = async (ticketId) => {
    const tecnicoId = prompt('Ingrese el ID del técnico:');
    if (!tecnicoId) return;
    await fetch(`${API_URL}/tickets/${ticketId}/assign`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ tecnicoId: Number(tecnicoId) })
    });
    alert('Ticket asignado');
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    await fetch(`${API_URL}/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ estado: newStatus })
    });
    alert('Estado actualizado');
  };

  const estados = [
    { value: 'Esperando', label: 'Esperando' },
    { value: 'Asignado', label: 'Asignado' },
    { value: 'EnProgreso', label: 'En Progreso' },
    { value: 'Resuelto', label: 'Resuelto' }
  ];

  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id} style={{ marginBottom: '1em' }}>
            <strong>{ticket.titulo}</strong> - {ticket.estado}
            {role === 'Administrador' && (
              <button onClick={() => handleAssign(ticket.id)}>Asignar</button>
            )}
            {role === 'Tecnico' && (
              <select
                value={ticket.estado}
                onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
              >
                {estados.map(e => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
