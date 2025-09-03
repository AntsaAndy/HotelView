using System;
using BCrypt.Net;

class Program
{
    static void Main()
    {
        Console.WriteLine("Admin hash: " + BCrypt.HashPassword("admin123!"));
        Console.WriteLine("Mod hash: " + BCrypt.HashPassword("mod123!"));
        Console.WriteLine("Analyst hash: " + BCrypt.HashPassword("analyst123!"));
    }
}
