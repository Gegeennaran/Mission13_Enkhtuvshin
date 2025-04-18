import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // ✅ Reusable function to load books and update all necessary states
  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks(pageSize, pageNum, [], sortOrder);
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalBooks / pageSize));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [pageSize, pageNum, sortOrder]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );
    if (!confirmDelete) return;
    try {
      await deleteBook(bookID);
      setBooks(books.filter((b) => b.bookID !== bookID));
    } catch (error) {
      alert("Failer to delete book. Please try again.");
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Books</h1>
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            loadBooks(); // ✅ reload list after adding
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            loadBooks(); // ✅ reload list after editing
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>BookId</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification/Category</th>
            <th>Page Count</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.bookID}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>
                {b.classification}/{b.category}
              </td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditingBook(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100 mb-1"
                  onClick={() => handleDelete(b.bookID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1); // reset to page 1 when size changes
        }}
      />
      <br />
      <button
        onClick={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      >
        Sort by Title ({sortOrder === "asc" ? "A → Z" : "Z → A"})
      </button>
    </div>
  );
};

export default AdminBooksPage;
