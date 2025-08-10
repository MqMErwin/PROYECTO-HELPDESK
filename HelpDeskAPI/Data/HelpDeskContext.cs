using HelpDeskAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskAPI.Data
{
    public class HelpDeskContext : DbContext
    {
        public HelpDeskContext(DbContextOptions<HelpDeskContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>()
                .Property(t => t.Estado)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .HasMany(u => u.TicketsCreados)
                .WithOne(t => t.Usuario)
                .HasForeignKey(t => t.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.TicketsAsignados)
                .WithOne(t => t.Tecnico)
                .HasForeignKey(t => t.TecnicoId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.MensajesEnviados)
                .WithOne(m => m.Usuario)
                .HasForeignKey(m => m.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Ticket>()
                .HasMany(t => t.ChatMessages)
                .WithOne(m => m.Ticket)
                .HasForeignKey(m => m.TicketId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
