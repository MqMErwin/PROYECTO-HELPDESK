import React, { useState } from 'react';
import './TechnicianDashboard.css';
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
  FiFileText
} from 'react-icons/fi';

export default function TechnicianDashboard({ onLogout }) {
  const [notifications] = useState([
    { id: 1, text: 'Nuevo ticket asignado #TKT-00789', time: '10 min ago', read: false },
    { id: 2, text: 'Ticket #TKT-00425 requiere atención', time: '1 hora ago', read: true },
    { id: 3, text: 'Recordatorio: Ticket pendiente de cierre', time: '2 días ago', read: true }
  ]);
  
  const [unreadNotifications] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  // Datos de ejemplo para tickets
  const [ticketStats] = useState({
    assigned: 8,
    inProgress: 3,
    resolved: 12,
    overdue: 1
  });

  const [recentTickets] = useState([
    { id: 'TKT-00789', title: 'Problema con impresora', status: 'Asignado', priority: 'Alta', time: 'Hace 15 min' },
    { id: 'TKT-00785', title: 'Software no funciona', status: 'En progreso', priority: 'Media', time: 'Hace 2 horas' },
    { id: 'TKT-00780', title: 'Acceso a red', status: 'Resuelto', priority: 'Baja', time: 'Ayer' }
  ]);

  return (
    <div className={`tech-dashboard ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Header superior */}
      <header className="tech-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1>
            <span className="logo-part">HelpDesk</span>
            <span className="logo-emi">TECH</span>
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
                  <a href="#">Ver todas</a>
                </div>
              </div>
            )}
          </div>
          
          <div className="user-profile">
            <div className="avatar">T</div>
            <div className="user-info">
              <span className="user-name">Técnico</span>
              <span className="user-role">Soporte TI</span>
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
      <div className="tech-content">
        {/* Sidebar */}
        <aside className="tech-sidebar">
          <nav>
            <ul>
              <li 
                className={activeMenu === 'dashboard' ? 'active' : ''}
                onClick={() => setActiveMenu('dashboard')}
              >
                <FiHome className="icon" />
                <a href="#">Dashboard</a>
              </li>
              <li 
                className={activeMenu === 'tickets' ? 'active' : ''}
                onClick={() => setActiveMenu('tickets')}
              >
                <FiMessageSquare className="icon" />
                <a href="#">Mis Tickets</a>
              </li>
              <li 
                className={activeMenu === 'new' ? 'active' : ''}
                onClick={() => setActiveMenu('new')}
              >
                <FiPlus className="icon" />
                <a href="#">Nuevo Reporte</a>
              </li>
              <li 
                className={activeMenu === 'history' ? 'active' : ''}
                onClick={() => setActiveMenu('history')}
              >
                <FiFileText className="icon" />
                <a href="#">Historial</a>
              </li>
              <li 
                className={activeMenu === 'settings' ? 'active' : ''}
                onClick={() => setActiveMenu('settings')}
              >
                <FiSettings className="icon" />
                <a href="#">Configuración</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Área principal */}
        <main className="tech-main">
          <div className="welcome-section">
            <h2>Bienvenido, <span>Técnico</span></h2>
            <p className="last-access">Último acceso: Hoy a las {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon assigned-stat">
                <FiMessageSquare />
              </div>
              <div className="stat-info">
                <span className="stat-value">{ticketStats.assigned}</span>
                <span className="stat-label">Asignados</span>
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
              <div className="stat-icon overdue-stat">
                <FiAlertCircle />
              </div>
              <div className="stat-info">
                <span className="stat-value">{ticketStats.overdue}</span>
                <span className="stat-label">Vencidos</span>
              </div>
            </div>
          </div>
          
          {/* Tarjetas de acción */}
          <div className="section-title">
            <h3>Acciones rápidas</h3>
            <a href="#" className="view-all">Ver todo</a>
          </div>
          
          <div className="card-container">
            <div className="tech-card tickets-card">
              <div className="card-icon">
                <FiMessageSquare />
              </div>
              <h3>Ver Tickets Asignados</h3>
              <p>Revisa los tickets que te han sido asignados para atención.</p>
              <button className="card-button">Ver Tickets</button>
            </div>

            <div className="tech-card update-card">
              <div className="card-icon">
                <FiCheckCircle />
              </div>
              <h3>Actualizar Estados</h3>
              <p>Marca los tickets como en progreso o resueltos.</p>
              <button className="card-button">Actualizar</button>
            </div>

            <div className="tech-card new-card">
              <div className="card-icon">
                <FiPlus />
              </div>
              <h3>Crear Reporte</h3>
              <p>Genera un nuevo reporte de incidencia o solicitud.</p>
              <button className="card-button">Nuevo Reporte</button>
            </div>
          </div>
          
          {/* Tickets recientes */}
          <div className="section-title">
            <h3>Tickets Recientes</h3>
            <a href="#" className="view-all">Ver todos</a>
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
        </main>
      </div>
    </div>
  );
}