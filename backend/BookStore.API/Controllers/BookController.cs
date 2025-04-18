using BookStore.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookContext;

        public BookController(BookDbContext bookContext)
        {
            _bookContext = bookContext;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageMany = 5, int pageNum = 1, [FromQuery] List<string>? bookCats = null,
            string sortBy = "title", string sortOrder = "asc")
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookCats != null && bookCats.Any())
            {
                query = query.Where(b => bookCats.Contains(b.Category));
            }

            if (sortBy == "title")
            {
                query = sortOrder == "asc"
                    ? query.OrderBy(b => b.Title)
                    : query.OrderByDescending(b => b.Title);
            }

            var totalBooks = query.Count();

            var result = query
                .Skip((pageNum - 1) * pageMany)
                .Take(pageMany)
                .ToList();

            var response = new
            {
                Books = result,
                TotalBooks = totalBooks
            };

            return Ok(response);
        }

        [HttpGet("GetCategory")]
        public IActionResult GetCategory()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }
     [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);
            existingBook.Title = updatedBook.Title;
            existingBook.Category = updatedBook.Category;
            existingBook.Price = updatedBook.Price;
            existingBook.Author = updatedBook.Author;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.PageCount = updatedBook.PageCount;
            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound(new { message = "Book not found." });
            }
            
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            return NoContent();
        }

    }

}