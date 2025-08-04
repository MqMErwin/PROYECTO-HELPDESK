using HelpDeskAPI.Data;
using HelpDeskAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly HelpDeskContext _context;

        public AuthController(HelpDeskContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Lógica de autenticación (temporal de prueba)
            if (request.Username == "admin" && request.Password == "1234")
            {
                return Ok(new { token = "fake-jwt-token", role = "Admin" });
            }

            return Unauthorized();
        }

        /// <summary>
        /// Registra un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="user">Datos del usuario a registrar.</param>
        /// <returns>Usuario creado.</returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(UsersController.GetUser), "Users", new { id = user.Id }, user);
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
