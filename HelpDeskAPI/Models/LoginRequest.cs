namespace HelpDeskAPI.Models
{
    public class LoginRequest
    {
        public string Correo { get; set; } = string.Empty;
        public string Contraseña { get; set; } = string.Empty;
    }
}
