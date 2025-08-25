using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers;

[ApiController]
// Route de base = "/users"
[Route("users")]
public class UsersController : ControllerBase
{
    private static List<User> users = new(); // stockage en mémoire (temporaire)
    private readonly string jwtKey = "TaCleSecreteSuperSecurisee123!";

    // ✅ Register
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto dto)
    {
        if (users.Any(u => u.Email == dto.Email))
            return BadRequest("Email déjà utilisé");

        var user = new User
        {
            Id = users.Count + 1,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role
        };
        users.Add(user);

        return Ok("Utilisateur enregistré");
    }

    // ✅ Login
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        var user = users.FirstOrDefault(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Identifiants invalides");

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(jwtKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);

        return Ok(new { token = jwtToken });
    }

    // ✅ Route protégée
    [HttpGet("protected")]
    [Authorize(Roles = "Admin")]
    public IActionResult AdminOnly()
    {
        return Ok("Bienvenue admin, tu es authentifié !");
    }
}
