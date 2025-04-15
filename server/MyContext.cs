using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


public class MyContext : IdentityDbContext<IdentityUser>{

    // With this protected method we initialize our sqlite DB.
    protected override void OnConfiguring( DbContextOptionsBuilder b ) => b.UseSqlite("Data Source=systeminfo.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    // This sets up our tables inside the DB.
    public DbSet<SystemInfo> SystemInfos { get; set;}
    public DbSet<DbHealth> dbHealths { get; set;}



}