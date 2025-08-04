using HelpDeskAPI.Data;
using HelpDeskAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly HelpDeskContext _context;

        public UsersController(HelpDeskContext context)
        {
            _context = context;
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return user;
        }

        // POST: api/users/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var correo = loginRequest.Correo;
            var contraseña = loginRequest.Contraseña;

            var user = _context.Users.FirstOrDefault(u => u.Correo == correo && u.Contraseña == contraseña);
            if (user == null)
            {
                return Unauthorized();
            }

            // Aquí puedes agregar la generación de token JWT real, o lo que desees devolver
            return Ok(new { token = "fake-jwt-token", role = user.Rol });
        }



    }
}
