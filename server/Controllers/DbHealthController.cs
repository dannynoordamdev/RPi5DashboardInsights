using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]

public class DbHealthController : ControllerBase{

    private MyContext _context = new MyContext();


    // Endpoint to add new DbHealth data into the database itself
    [HttpPost]
    public IActionResult PostDbHealthInformation([FromBody] DbHealthDto dto){
        var dbHealth = new DbHealth{
            SizeMB = dto.SizeMB,
            TotalRows = dto.TotalRows,
            TimeStamp = DateTime.Now

        };

        _context.dbHealths.Add(dbHealth);
        _context.SaveChanges();

        return Ok(dbHealth);
    }

    [HttpGet("latest")]
    public async Task<ActionResult<SystemInfo>> GetLatestDatabaseInfo()
    {
        var latestDbInfo = await _context.dbHealths
                                        .OrderByDescending(si => si.TimeStamp)
                                        .FirstOrDefaultAsync();
        return Ok(latestDbInfo);
    }

}