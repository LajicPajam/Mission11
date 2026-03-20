using Microsoft.EntityFrameworkCore;
using Mission11.Api.Data;
using Mission11.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddDbContext<BookstoreContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("Frontend");

app.MapGet("/books", async (BookstoreContext db, int pageSize = 5, int pageNum = 1, string sortOrder = "asc") =>
{
    if (pageSize < 1)
    {
        pageSize = 5;
    }

    if (pageNum < 1)
    {
        pageNum = 1;
    }

    // Only allow the two supported title sort directions from the UI.
    var normalizedSortOrder = sortOrder.Equals("desc", StringComparison.OrdinalIgnoreCase) ? "desc" : "asc";

    // Apply sorting before Skip/Take so each page stays consistent.
    var booksQuery = normalizedSortOrder == "desc"
        ? db.Books.AsNoTracking().OrderByDescending(book => book.Title)
        : db.Books.AsNoTracking().OrderBy(book => book.Title);

    var totalBooks = await db.Books.CountAsync();
    var books = await booksQuery
        .Skip((pageNum - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return Results.Ok(new BooksResponse
    {
        Books = books,
        TotalBooks = totalBooks
    });
});

app.Run();
