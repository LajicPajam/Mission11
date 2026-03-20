namespace Mission11.Api.Models;

public class BooksResponse
{
    public IEnumerable<Book> Books { get; set; } = [];
    public int TotalBooks { get; set; }
}
