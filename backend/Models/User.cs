namespace Backend.Models;

public enum Role
{
    User,
    Partner,
    Admin,
    Moderateur,
    DataAnalyst
}

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public Role Role { get; set; } = Role.User;
}
