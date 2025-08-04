using System.ComponentModel.DataAnnotations;

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
        public string Contraseña { get; set; } = string.Empty;

        [Required]
        public string Rol { get; set; } = string.Empty; // ejemplo: "Usuario", "Técnico", "Admin"

        public ICollection<Ticket> TicketsCreados { get; set; } = new List<Ticket>();

        public ICollection<Ticket> TicketsAsignados { get; set; } = new List<Ticket>();

        public ICollection<ChatMessage> MensajesEnviados { get; set; } = new List<ChatMessage>();
    }
}
