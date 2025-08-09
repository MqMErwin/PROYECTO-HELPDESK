import React from 'react';

const API_URL = 'http://localhost:5131/api';

function TicketList({ tickets = [] }) {
  const handleAssign = async (ticketId) => {
    const tecnicoId = prompt('Ingrese el ID del técnico:');
    if (!tecnicoId) return;
    await fetch(`${API_URL}/tickets/${ticketId}/assign`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tecnicoId: Number(tecnicoId) })
    });
    alert(`Ticket ${ticketId} asignado al técnico ${tecnicoId}`);
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    if (newStatus === 'Cerrado') {
      await fetch(`${API_URL}/tickets/${ticketId}/resolve`, { method: 'POST' });
      alert(`Ticket ${ticketId} resuelto y eliminado`);
    } else {
      await fetch(`${API_URL}/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newStatus })
      });
      alert(`Estado del ticket ${ticketId} actualizado a ${newStatus}`);
    }
  };

  return (
    <div>
      <h2>Lista de Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id} style={{ marginBottom: '1em' }}>
            <strong>{ticket.titulo}</strong>: {ticket.descripcion}<br />
            <span>Estado: {ticket.estado || 'Desconocido'}</span><br />
            <button onClick={() => handleAssign(ticket.id)}>Asignar</button>
            <select onChange={e => handleStatusChange(ticket.id, e.target.value)} value={ticket.estado || ''}>
              <option value="Abierto">Abierto</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
