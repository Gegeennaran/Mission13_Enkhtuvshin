import { Book } from "../types/Book";

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

const API_URL =
  "https://bookstore-mission13-enkhtuvshin-gafsfjbtgtfjehdc.eastus-01.azurewebsites.net";

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

    const url = `${API_URL}/Book?pageMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}${
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

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/deleteBook/${bookID}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/Book/addbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book,
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/updatebook/${bookID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error(`Failed to update movie: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating movie", error);
    throw error;
  }
};
