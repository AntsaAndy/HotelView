using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        // Bloquer la création de comptes Admin, Moderateur, DataAnalyst
        if (dto.Role == Role.Admin || dto.Role == Role.Moderateur || dto.Role == Role.DataAnalyst)
            return BadRequest("Impossible de créer ce rôle via l'inscription.");

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Utilisateur enregistré avec succès.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return Unauthorized("Email ou mot de passe incorrect.");
        }

        // Ici tu peux générer un token JWT si tu veux
        return Ok(new { user.Id, user.Username, user.Role });
    }
}

// DTO pour Register
public class RegisterDto
{
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public Role Role { get; set; } = Role.User; // User ou Partner uniquement
}

// DTO pour Login
public class LoginDto
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
