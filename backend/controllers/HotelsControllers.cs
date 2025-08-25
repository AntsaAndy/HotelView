// Controllers/HotelController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HotelController : ControllerBase
{
    [HttpGet("preview")]
    public IActionResult GetPreview()
    {
        var hotels = new[]
        {
            new { Id = 1, Name = "Hotel Central", Price = 45, City = "Antananarivo" },
            new { Id = 2, Name = "Sunny Lodge", Price = 60, City = "Antananarivo" }
        };

        return Ok(hotels);
    }
}
