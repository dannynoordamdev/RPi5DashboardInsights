// After making changes to the backend:
// dotnet publish -c Release -o /home/danny/RPi5DashboardInsights/server/publish
// sudo systemctl restart aspnetcoreapp

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
.AddCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.Name = "AuthCookie";
    options.Cookie.SameSite = SameSiteMode.Lax; // Of Strict
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Voor HTTPS
    options.ExpireTimeSpan = TimeSpan.FromDays(7);
    options.SlidingExpiration = true;
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
});


// Setup CORS 
builder.Services.AddCors(options =>{

    options.AddPolicy("AllowReactApp", policy => {
        policy.WithOrigins("http://localhost:6711")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    
    });
});

builder.Services.AddDbContext<MyContext>();

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Lockout.MaxFailedAccessAttempts = 3;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    options.Lockout.AllowedForNewUsers = true;
})
    .AddEntityFrameworkStores<MyContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();

app.Run("http://localhost:6710");
