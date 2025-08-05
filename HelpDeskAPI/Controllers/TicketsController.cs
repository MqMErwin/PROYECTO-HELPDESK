using HelpDeskAPI.Data;
using HelpDeskAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly HelpDeskContext _context;

        public TicketsController(HelpDeskContext context)
        {
            _context = context;
        }

        // GET: api/tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(
            [FromQuery] string? estado,
            [FromQuery] int? usuarioId,
            [FromQuery] int? tecnicoId)
        {
            var query = _context.Tickets
                .Include(t => t.Usuario)
                .Include(t => t.Tecnico)
                .AsQueryable();

            if (!string.IsNullOrEmpty(estado))
            {
                query = query.Where(t => t.Estado == estado);
            }
            if (usuarioId.HasValue)
            {
                query = query.Where(t => t.UsuarioId == usuarioId);
            }
            if (tecnicoId.HasValue)
            {
                query = query.Where(t => t.TecnicoId == tecnicoId);
            }

            return await query.ToListAsync();
        }

        // GET: api/tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.Usuario)
                .Include(t => t.Tecnico)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null)
                return NotFound();

            return ticket;
        }

        // POST: api/tickets
        [HttpPost]
        public async Task<ActionResult<Ticket>> CreateTicket(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
        }

        // PUT: api/tickets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, [FromBody] Ticket updatedTicket)
        {
            if (id != updatedTicket.Id)
            {
                return BadRequest();
            }

            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            ticket.Titulo = updatedTicket.Titulo;
            ticket.Descripcion = updatedTicket.Descripcion;
            ticket.TecnicoId = updatedTicket.TecnicoId;
            ticket.Estado = updatedTicket.Estado;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/tickets/{id}/assign
        [HttpPut("{id}/assign")]
        public async Task<IActionResult> AssignTicket(int id, [FromBody] AssignTicketRequest request)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            ticket.TecnicoId = request.TecnicoId;
            ticket.Estado = "Asignado";

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT: api/tickets/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateTicketStatusRequest request)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            ticket.Estado = request.Estado;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/tickets/{id}/resolve
        [HttpPost("{id}/resolve")]
        public async Task<IActionResult> ResolveTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
