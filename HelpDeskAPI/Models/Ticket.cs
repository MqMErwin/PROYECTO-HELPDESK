using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HelpDeskAPI.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        [Required]
        public string Titulo { get; set; }

        public string Descripcion { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        public User Usuario { get; set; }

        public int? TecnicoId { get; set; }

        public User Tecnico { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

        public string Estado { get; set; } = "Abierto";

        // ✅ Relación con mensajes
        public ICollection<ChatMessage> ChatMessages { get; set; }
    }
}
