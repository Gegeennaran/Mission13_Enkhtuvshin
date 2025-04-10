import { useState } from "react";
import { Book } from "../types/Book";
import { updateBook } from "../api/BooksAPI";

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook(formData.bookID, formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to update book:", error);
      alert("Something went wrong while updating the book.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Edit Book</h2>
      {Object.entries(formData).map(([key, value]) => (
        <label key={key} className="block mb-2">
          {key.charAt(0).toUpperCase() + key.slice(1)}:
          <input
            type={typeof value === "number" ? "number" : "text"}
            name={key}
            value={value}
            onChange={handleChange}
            required
            className="border p-1 w-full"
            disabled={key === "bookID"} // Prevent editing the ID
          />
        </label>
      ))}
      <button type="submit" className="btn btn-primary mr-2">
        Update Book
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;
