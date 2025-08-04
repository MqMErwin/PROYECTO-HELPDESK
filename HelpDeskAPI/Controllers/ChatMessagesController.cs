using HelpDeskAPI.Data;
using HelpDeskAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatMessagesController : ControllerBase
    {
        private readonly HelpDeskContext _context;

        public ChatMessagesController(HelpDeskContext context)
        {
            _context = context;
        }

        // GET: api/chatmessages/byticket/5
        [HttpGet("byticket/{ticketId}")]
        public async Task<ActionResult<IEnumerable<ChatMessage>>> GetMessagesByTicket(int ticketId)
        {
            var messages = await _context.ChatMessages
                .Where(m => m.TicketId == ticketId)
                .Include(m => m.Usuario)
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return messages;
        }

        // POST: api/chatmessages
        [HttpPost]
        public async Task<ActionResult<ChatMessage>> PostMessage(ChatMessage message)
        {
            message.Timestamp = DateTime.UtcNow;
            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMessagesByTicket), new { ticketId = message.TicketId }, message);
        }
    }
}
