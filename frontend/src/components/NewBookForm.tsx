import { useState } from "react";
import { Book } from "../types/Book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Omit<Book, "bookID">>({
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    classification: "",
    category: "",
    pageCount: 0,
    price: 0,
  });

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
      await addBook(formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to add book:", error);
      alert("Something went wrong while adding the book.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Add New Book</h2>
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
          />
        </label>
      ))}
      <button type="submit" className="btn btn-success mr-2">
        Add Book
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewBookForm;
