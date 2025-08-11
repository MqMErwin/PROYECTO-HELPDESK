import React from 'react';
import TicketForm from './TicketForm';
import './UserDashboard.css';

export default function UserDashboard({ onLogout, token }) {
  return (
    <div className="user-dashboard">
      <header className="user-header">
        <h1>HelpDesk</h1>
        <button onClick={onLogout}>Cerrar sesión</button>
      </header>
      <main className="user-main">
        <TicketForm token={token} />
      </main>
    </div>
  );
}
