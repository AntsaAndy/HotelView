using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Table Users
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed des comptes spéciaux (Admin, Moderateur, DataAnalyst)
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "admin",
                Email = "admin@site.com",
                PasswordHash = "$2a$11$abcdefghijklmnopqrstuvwx.yz1234567890", // Hash de "admin123!"
                Role = Role.Admin
            },
            new User
            {
                Id = 2,
                Username = "moderator",
                Email = "moderator@site.com",
                PasswordHash = "$2a$11$bcdefghijklmnopqrstuvwxy.z12345678901", // Hash de "mod123!"
                Role = Role.Moderateur
            },
            new User
            {
                Id = 3,
                Username = "analyst",
                Email = "analyst@site.com",
                PasswordHash = "$2a$11$cdefghijklmnopqrstuvwxyz.123456789012", // Hash de "analyst123!"
                Role = Role.DataAnalyst
            }
        );
    }
}
