using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]

public class DbHealthController : ControllerBase{

    private MyContext _myContext = new MyContext();


    // Endpoint to add new DbHealth data into the database itself
    [HttpPost]
    public IActionResult PostDbHealthInformation([FromBody] DbHealthDto dto){
        var dbHealth = new DbHealth{
            SizeMB = dto.SizeMB,
            TotalRows = dto.TotalRows,
            TimeStamp = DateTime.UtcNow

        };

        _myContext.dbHealths.Add(dbHealth);
        _myContext.SaveChanges();

        return Ok(dbHealth);
    }

}