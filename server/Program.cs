
// After making changes to the backend:
// dotnet publish -c Release -o /home/danny/RPi5DashboardInsights/server/publish
// sudo systemctl restart aspnetcoreapp

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// Setup CORS 
builder.Services.AddCors(options =>{

    options.AddPolicy("AllowReactApp", policy => {
        policy.WithOrigins("http://localhost:6711")
        .AllowAnyHeader()
        .AllowAnyMethod();
    
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



app.MapControllers();

app.Run("http://localhost:6710");
