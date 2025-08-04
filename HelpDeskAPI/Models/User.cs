using System.ComponentModel.DataAnnotations;

namespace HelpDeskAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Correo { get; set; }

        [Required]
        public string Contraseña { get; set; }

        [Required]
        public string Rol { get; set; } // ejemplo: "Usuario", "Técnico", "Admin"

        public ICollection<Ticket> TicketsCreados { get; set; }

        public ICollection<Ticket> TicketsAsignados { get; set; }

        public ICollection<ChatMessage> MensajesEnviados { get; set; }
    }
}
