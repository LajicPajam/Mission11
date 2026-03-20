using Microsoft.EntityFrameworkCore;
using Mission11.Api.Models;

namespace Mission11.Api.Data;

public class BookstoreContext(DbContextOptions<BookstoreContext> options) : DbContext(options)
{
    public DbSet<Book> Books => Set<Book>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Map the entity to the existing SQLite table from the assignment download.
        modelBuilder.Entity<Book>().ToTable("Books");
    }
}
