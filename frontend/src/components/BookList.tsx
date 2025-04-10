import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";

function BookList({ selectedCat }: { selectedCat: string[] }) {
  const [books, setBooks] = useState<Book[]>();
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks(pageSize, pageNum, selectedCat, sortOrder);
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
  }, [pageSize, pageNum, sortOrder, selectedCat]);

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p className="text-red-500">Error</p>;

  return (
    <>
      <br />
      {books?.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Book Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification/Category: </strong>
                {b.classification} / {b.category}
              </li>
              <li>
                <strong>Number of Pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price.toFixed(2)}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(
                  `/addcart/${encodeURIComponent(b.title)}/${b.bookID}?price=${b.price}`,
                )
              }
            >
              Add to shopping cart
            </button>
          </div>
        </div>
      ))}

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

      <br />
      <button
        onClick={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      >
        Sort by Title ({sortOrder === "asc" ? "A → Z" : "Z → A"})
      </button>
    </>
  );
}

export default BookList;
