using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
    
    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Book>()
            .Property(b => b.BookID)
            .ValueGeneratedOnAdd();
    }
}