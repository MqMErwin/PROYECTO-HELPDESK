using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HelpDeskAPI.Models
{
    public enum TicketEstado
    {
        Esperando,
        Asignado,
        EnProgreso,
        Resuelto
    }

    public class Ticket
    {
        public int Id { get; set; }

        [Required]
        public string Titulo { get; set; } = string.Empty;

        public string? Descripcion { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        public User? Usuario { get; set; }

        public int? TecnicoId { get; set; }

        public User? Tecnico { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

        public TicketEstado Estado { get; set; } = TicketEstado.Esperando;

        // ✅ Relación con mensajes
        public ICollection<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();
    }
}
