using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class AppStatusController : ControllerBase{
    private MyContext _context = new MyContext();

    [HttpPost]
    public IActionResult PostApplicationStatus([FromBody] AppStatusDto dto){
        var appStatus = new AppStatus{
            Name = dto.Name,
            Status = dto.Status,
            Uptime = dto.Uptime,
            TimeStamp = DateTime.Now

        };
    
        _context.appStatuses.Add(appStatus);
        _context.SaveChanges();

        return Ok(appStatus);
    }

    [HttpGet("latest")]
    public async Task<ActionResult<AppStatus>> GetLatestAppStatus()
    {
        var latestAppStatus = await _context.appStatuses
                                        .OrderByDescending(si => si.TimeStamp)
                                        .FirstOrDefaultAsync();
        return Ok(latestAppStatus);
    }
}