import { Book } from "../types/Book";

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

const API_URL =
  "https://bookstore-mission13-enkhtuvshin-gafsfjbtgtfjehdc.eastus-01.azurewebsites.net/";

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
    const response = await fetch(
      `${API_URL}/Book?pageMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}${selectedCat.length ? `&${catParams}` : ""}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return await response.json();
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
