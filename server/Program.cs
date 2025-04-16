
// After making changes to the backend:
// dotnet publish -c Release -o /home/danny/RPi5DashboardInsights/server/publish
// sudo systemctl restart aspnetcoreapp

using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
.AddCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Lax; // Of Strict
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Voor HTTPS
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthentication();
app.MapControllers();

app.Run("http://localhost:6710");
