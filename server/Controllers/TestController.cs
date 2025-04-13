using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase{

    [HttpGet]
    public IActionResult ZegHallo(){
        return Ok("Greetings from ASP.NET CORE!");
    }
}