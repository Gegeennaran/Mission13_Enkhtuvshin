import { useEffect, useState } from "react";
import "./CategoryFilter.css";
function CategoryFilter({
  selectedCat,
  setSelectedCat,
}: {
  setSelectedCat: (catergories: string[]) => void;
  selectedCat: string[];
}) {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://bookstore-mission13-enkhtuvshin-gafsfjbtgtfjehdc.eastus-01.azurewebsites.net/Book/GetCategory",
        );
        const data = await response.json();
        console.log("Fetched categories", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);
  function onChange({ target }: { target: HTMLInputElement }) {
    const updatedCat = selectedCat.includes(target.value)
      ? selectedCat.filter((c) => c !== target.value)
      : [...selectedCat, target.value];
    setSelectedCat(updatedCat);
  }
  return (
    <div className="category-filter">
      <h5>Book Categories</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={onChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
