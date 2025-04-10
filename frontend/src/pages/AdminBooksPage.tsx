import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";
import Pagination from "../components/Pagination";

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const reloadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks(pageSize, pageNum, [], "asc");
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalBooks / pageSize));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadBooks();
  }, [pageSize, pageNum]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookID);
      reloadBooks();
    } catch (error) {
      alert("Failed to delete book. Please try again.");
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <h1>Admin - Book List</h1>

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
            reloadBooks();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            reloadBooks();
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
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
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => {
                    setEditingBook(b);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
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
          setPageNum(1);
        }}
      />
    </>
  );
};

export default AdminBooksPage;
