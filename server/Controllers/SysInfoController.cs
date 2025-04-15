using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class SysInfoController : ControllerBase{

    private MyContext _context = new MyContext();

    // Endpoint to retrieve all stored System Data
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SystemInfo>>> GetSystemInfo(){
        return await _context.SystemInfos.ToListAsync();
    }

    [HttpGet("latest")]
    public async Task<ActionResult<SystemInfo>> GetLatestSystemInfo()
    {
        var latestSysInfo = await _context.SystemInfos
                                        .OrderByDescending(si => si.TimeStamp)
                                        .FirstOrDefaultAsync();
        return Ok(latestSysInfo);
    }


    // Endpoint to retrieve stored System Info based upon ID.
    [HttpGet("{id}")]
    public async Task<ActionResult<SystemInfo>> GetSystemInfo(int id){
        var sysInfo = await _context.SystemInfos.FindAsync(id);

        if(sysInfo == null){
            return NotFound();
        }

        return sysInfo;
    }

    // Endpoint to POST new System Information. Using the DTO
    [HttpPost]
    public IActionResult PostSystemInformation([FromBody] SystemInfoDto dto){
        var sysInfo = new SystemInfo{
            CpuUsage = dto.CpuUsage,
            MemoryUsage = dto.MemoryUsage,
            Temperature = dto.Temperature,
            TimeStamp = DateTime.UtcNow
        };

        _context.SystemInfos.Add(sysInfo);
        _context.SaveChanges();

        return Ok(sysInfo);
    }





    // Endpoint to delete a record of System Information.
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSystemInfo(int id){
        var sysInfo = await _context.SystemInfos.FindAsync(id);
       
        if(sysInfo == null){
            return NotFound();
        }

        _context.SystemInfos.Remove(sysInfo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}