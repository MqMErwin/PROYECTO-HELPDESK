using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HelpDeskAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public string Correo { get; set; } = string.Empty;

        [Required]
        [Column("Contraseña")]
        public string Contrasena { get; set; } = string.Empty;

        [Required]
        public string Rol { get; set; } = string.Empty; // Roles: "Administrador", "Tecnico", "Solicitante"

        public ICollection<Ticket> TicketsCreados { get; set; } = new List<Ticket>();

        public ICollection<Ticket> TicketsAsignados { get; set; } = new List<Ticket>();

        public ICollection<ChatMessage> MensajesEnviados { get; set; } = new List<ChatMessage>();
    }
}
