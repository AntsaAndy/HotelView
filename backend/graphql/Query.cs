namespace Backend.GraphQL;

using Backend.Data;
using Backend.Models;

public class Query
{
    // Récupérer tous les utilisateurs
    public IQueryable<Backend.Models.User> GetUsers([Service] AppDbContext context)
    {
        return context.Users;
    }
}
