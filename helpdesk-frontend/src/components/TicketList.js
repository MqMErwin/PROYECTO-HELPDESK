import React from 'react';

function TicketList({ tickets = [] }) {
  const handleAssign = (ticketId) => {
    // TODO: Implement assignment logic (API call)
    alert(`Assign ticket ${ticketId} to a technician`);
  };

  const handleStatusChange = (ticketId, newStatus) => {
    // TODO: Implement status update logic (API call)
    alert(`Change status of ticket ${ticketId} to ${newStatus}`);
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
