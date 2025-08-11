import React, { useState } from 'react';
import './UserDashboard.css';
import {
  FiHome,
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiUser,
  FiPlus,
  FiLogOut,
  FiBell,
  FiMenu,
  FiX,
  FiChevronDown,
  FiSettings,
  FiFileText,
  FiHelpCircle
} from 'react-icons/fi';
import TicketList from './TicketList';
import TicketForm from './TicketForm';

export default function UserDashboard({ onLogout, token, role }) {
  const [notifications] = useState([
    { id: 1, text: 'Tu ticket #TKT-00789 ha sido asignado', time: '10 min ago', read: false },
    { id: 2, text: 'Respuesta a tu ticket #TKT-00785', time: '1 hora ago', read: true },
    { id: 3, text: 'Recordatorio: Califica la atención recibida', time: '2 días ago', read: true }
  ]);
  
  const [unreadNotifications] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  // Datos de ejemplo para tickets
  const [ticketStats] = useState({
    open: 2,
    inProgress: 1,
    resolved: 5,
    urgent: 1
  });

  const [recentTickets] = useState([
    { id: 'TKT-00789', title: 'Problema con acceso a plataforma', status: 'Asignado', priority: 'Alta', time: 'Hace 15 min' },
    { id: 'TKT-00785', title: 'Consulta sobre software', status: 'En progreso', priority: 'Media', time: 'Hace 2 horas' },
    { id: 'TKT-00780', title: 'Contraseña olvidada', status: 'Resuelto', priority: 'Baja', time: 'Ayer' }
  ]);

  return (
    <div className={`user-dashboard ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Header superior */}
      <header className="user-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1>
            <span className="logo-part">HelpDesk</span>
            <span className="logo-emi">ESTUDIANTE</span>
          </h1>
        </div>
        
        <div className="header-right">
          <div className="notification-wrapper">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FiBell />
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>Notificaciones</h4>
                  <span className="mark-read">Marcar todas como leídas</span>
                </div>
                <div className="notification-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? '' : 'unread'}`}
                    >
                      <div className="notification-dot"></div>
                      <div className="notification-content">
                        <p>{notification.text}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              <div className="notification-footer">
                <button type="button">Ver todas</button>
              </div>
              </div>
            )}
          </div>
          
          <div className="user-profile">
            <div className="avatar">ES</div>
            <div className="user-info">
              <span className="user-name">Estudiante</span>
              <span className="user-role">Usuario</span>
            </div>
            <FiChevronDown className="dropdown-icon" />
          </div>
          
          <button className="logout-button" onClick={onLogout}>
            <FiLogOut />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="user-content">
        {/* Sidebar */}
        <aside className="user-sidebar">
          <nav>
            <ul>
              <li className={activeMenu === 'dashboard' ? 'active' : ''}>
                <button type="button" onClick={() => setActiveMenu('dashboard')}>
                  <FiHome className="icon" />
                  <span>Inicio</span>
                </button>
              </li>
              <li className={activeMenu === 'new-ticket' ? 'active' : ''}>
                <button type="button" onClick={() => setActiveMenu('new-ticket')}>
                  <FiPlus className="icon" />
                  <span>Nuevo Ticket</span>
                </button>
              </li>
              <li className={activeMenu === 'my-tickets' ? 'active' : ''}>
                <button type="button" onClick={() => setActiveMenu('my-tickets')}>
                  <FiMessageSquare className="icon" />
                  <span>Mis Tickets</span>
                </button>
              </li>
              <li className={activeMenu === 'faq' ? 'active' : ''}>
                <button type="button" onClick={() => setActiveMenu('faq')}>
                  <FiHelpCircle className="icon" />
                  <span>Preguntas Frecuentes</span>
                </button>
              </li>
              <li className={activeMenu === 'settings' ? 'active' : ''}>
                <button type="button" onClick={() => setActiveMenu('settings')}>
                  <FiSettings className="icon" />
                  <span>Configuración</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Área principal */}
        <main className="user-main">
          {activeMenu === 'dashboard' && (
            <>
              <div className="welcome-section">
                <h2>Bienvenido, <span>Estudiante</span></h2>
                <p className="last-access">Último acceso: Hoy a las {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>

              {/* Estadísticas rápidas */}
              <div className="quick-stats">
                <div className="stat-card">
                  <div className="stat-icon open-stat">
                    <FiMessageSquare />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{ticketStats.open}</span>
                    <span className="stat-label">Abiertos</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon progress-stat">
                    <FiClock />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{ticketStats.inProgress}</span>
                    <span className="stat-label">En progreso</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon resolved-stat">
                    <FiCheckCircle />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{ticketStats.resolved}</span>
                    <span className="stat-label">Resueltos</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon urgent-stat">
                    <FiAlertCircle />
                  </div>
                  <div className="stat-info">
                    <span className="stat-value">{ticketStats.urgent}</span>
                    <span className="stat-label">Urgentes</span>
                  </div>
                </div>
              </div>

              {/* Tarjetas de acción */}
              <div className="section-title">
                <h3>Acciones rápidas</h3>
                <button type="button" className="view-all">Ver todo</button>
              </div>

              <div className="card-container">
                <div className="user-card new-ticket-card">
                  <div className="card-icon">
                    <FiPlus />
                  </div>
                  <h3>Crear Nuevo Ticket</h3>
                  <p>Reporta cualquier problema técnico que tengas con el sistema.</p>
                  <button className="card-button" onClick={() => setActiveMenu('new-ticket')}>Nuevo Ticket</button>
                </div>

                <div className="user-card check-status-card">
                  <div className="card-icon">
                    <FiMessageSquare />
                  </div>
                  <h3>Consultar Estado</h3>
                  <p>Revisa el estado actual de tus tickets reportados.</p>
                  <button className="card-button" onClick={() => setActiveMenu('my-tickets')}>Ver Tickets</button>
                </div>

                <div className="user-card faq-card">
                  <div className="card-icon">
                    <FiHelpCircle />
                  </div>
                  <h3>Preguntas Frecuentes</h3>
                  <p>Encuentra respuestas rápidas a las dudas más comunes.</p>
                  <button className="card-button" onClick={() => setActiveMenu('faq')}>Ver FAQ</button>
                </div>
              </div>

              {/* Tickets recientes */}
              <div className="section-title">
                <h3>Tickets Recientes</h3>
                <button type="button" className="view-all">Ver todos</button>
              </div>

              <div className="tickets-table">
                <div className="table-header">
                  <div className="header-item">ID Ticket</div>
                  <div className="header-item">Descripción</div>
                  <div className="header-item">Estado</div>
                  <div className="header-item">Prioridad</div>
                  <div className="header-item">Tiempo</div>
                  <div className="header-item">Acciones</div>
                </div>

                {recentTickets.map(ticket => (
                  <div className="table-row" key={ticket.id}>
                    <div className="row-item">{ticket.id}</div>
                    <div className="row-item">{ticket.title}</div>
                    <div className="row-item">
                      <span className={`status-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <div className="row-item">
                      <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="row-item">{ticket.time}</div>
                    <div className="row-item">
                      <button className="action-button">Ver</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeMenu === 'new-ticket' && (
            <TicketForm token={token} />
          )}
          {activeMenu === 'my-tickets' && (
            <TicketList token={token} role={role} />
          )}
          {activeMenu === 'faq' && (
            <div className="placeholder">Sección de preguntas frecuentes en construcción</div>
          )}
          {activeMenu === 'settings' && (
            <div className="placeholder">Configuración del usuario en construcción</div>
          )}
        </main>
      </div>
    </div>
  );
}
