import { Book } from "../types/Book";

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

// const API_URL =
//"https://localhost:5000/Book";

const API_URL =
  "https://bookstore-mission13-enkhtuvshin-gafsfjbtgtfjehdc.eastus-01.azurewebsites.net/Book";

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCat: string[],
  sortOrder: "asc" | "desc",
): Promise<FetchBooksResponse> => {
  try {
    const catParams = selectedCat
      .map((cat) => `bookCats=${encodeURIComponent(cat)}`)
      .join("&");

    const url = `${API_URL}?pageMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}${
      selectedCat.length ? `&${catParams}` : ""
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error("Failed to add book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding book", error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book,
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating book", error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book", error);
    throw error;
  }
};
