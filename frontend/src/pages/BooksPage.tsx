import BookList from "../components/BookList";
import CartSummary from "../components/CartSummary";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import { useState } from "react";
import { Link } from "react-router-dom";
function ProjectPage() {
  const [selectedCat, setSelectedCat] = useState<string[]>([]);
  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand />
      <br />

      <Link to="/adminBook">
        <button className="btn btn-primary">Go to Admin Book Page</button>
      </Link>

      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCat={selectedCat} />
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
