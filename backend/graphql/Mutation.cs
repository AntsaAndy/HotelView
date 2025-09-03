namespace Backend.GraphQL;

using Backend.Models;
using Backend.Data;
using BCrypt.Net;
using HotChocolate;
using System.Linq;

public class Mutation
{
    public Backend.Models.User AddUser([Service] AppDbContext context, string username, string email, string password, Role role)
    {
        // Les rôles spéciaux ne peuvent pas être créés via l'API
        if (role == Role.Moderateur || role == Role.DataAnalyst)
            throw new GraphQLException("Impossible de créer ce rôle via l'interface");

        // Vérifier si l'utilisateur existe déjà
        if (context.Users.Any(u => u.Username == username || u.Email == email))
            throw new GraphQLException("Un utilisateur avec ce nom d'utilisateur ou email existe déjà");

        var user = new Backend.Models.User
        {
            Username = username,
            Email = email,
            PasswordHash = BCrypt.HashPassword(password),
            Role = role
        };

        context.Users.Add(user);
        context.SaveChanges();
        return user;
    }

    public LoginResponse Login([Service] AppDbContext context, string email, string password)
    {
        var user = context.Users.FirstOrDefault(u => u.Email == email);
        if (user == null || !BCrypt.Verify(password, user.PasswordHash))
        {
            throw new GraphQLException("Email ou mot de passe incorrect.");
        }

        return new LoginResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role
        };
    }
}

public class LoginResponse
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public Role Role { get; set; }
}
