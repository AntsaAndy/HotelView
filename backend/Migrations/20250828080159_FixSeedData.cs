using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FixSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "Role" },
                values: new object[] { "admin123!", 2 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "PasswordHash", "Role" },
                values: new object[] { "mod123!", 3 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "PasswordHash", "Role" },
                values: new object[] { "analyst123!", 4 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "Role" },
                values: new object[] { "$2a$11$r9cUZfVlL2v1Xg7qYhKj3O1Wz3cZ5X7Y9A0bC1dE2fG3hI4j5K6L7M8N9O0P", 0 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "PasswordHash", "Role" },
                values: new object[] { "$2a$11$s0dUZfVlL2v1Xg7qYhKj3O1Wz3cZ5X7Y9A0bC1dE2fG3hI4j5K6L7M8N9O0P", 1 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "PasswordHash", "Role" },
                values: new object[] { "$2a$11$t1dUZfVlL2v1Xg7qYhKj3O1Wz3cZ5X7Y9A0bC1dE2fG3hI4j5K6L7M8N9O0P", 2 });
        }
    }
}
