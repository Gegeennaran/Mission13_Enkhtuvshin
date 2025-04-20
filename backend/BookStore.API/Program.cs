using BookStore.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add your database context
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

// ✅ Define the CORS policy BEFORE builder.Build()
builder.Services.AddCors(options =>

    options.AddPolicy("AllowReactApp",policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://green-field-06983411e.6.azurestaticapps.net")
            .AllowAnyHeader()
            .AllowAnyMethod();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp"); 
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();