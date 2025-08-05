import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5131/api';

function TicketList({ filter = {}, currentUserId }) {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    titulo: '',
    descripcion: '',
    usuarioId: currentUserId || ''
  });

  const fetchTickets = async () => {
    const params = new URLSearchParams(filter);
    const response = await fetch(`${API_URL}/tickets?${params.toString()}`);
    const data = await response.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, [JSON.stringify(filter)]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const ticketData = {
      titulo: newTicket.titulo,
      descripcion: newTicket.descripcion,
      usuarioId: currentUserId ?? Number(newTicket.usuarioId)
    };
    await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData)
    });
    setNewTicket({ titulo: '', descripcion: '', usuarioId: currentUserId || '' });
    fetchTickets();
  };
  const handleAssign = async (ticketId) => {
    const tecnicoId = prompt('Ingrese el ID del técnico:');
    if (!tecnicoId) return;
    await fetch(`${API_URL}/tickets/${ticketId}/assign`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tecnicoId: Number(tecnicoId) })
    });
    alert(`Ticket ${ticketId} asignado al técnico ${tecnicoId}`);
    fetchTickets();
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
    fetchTickets();
  };

  return (
    <div>
      <h2>Lista de Tickets</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Título"
          value={newTicket.titulo}
          onChange={e => setNewTicket({ ...newTicket, titulo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newTicket.descripcion}
          onChange={e => setNewTicket({ ...newTicket, descripcion: e.target.value })}
        />
        {!currentUserId && (
          <input
            type="number"
            placeholder="ID Usuario"
            value={newTicket.usuarioId}
            onChange={e => setNewTicket({ ...newTicket, usuarioId: e.target.value })}
            required
          />
        )}
        <button type="submit">Crear Ticket</button>
      </form>
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
