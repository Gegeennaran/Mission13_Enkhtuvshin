import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingCard from "./pages/ShoppingCard";
import BooksPage from "./pages/BooksPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AdminBooksPage from "./pages/AdminBooksPage";
function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/addcart/:title/:bookID" element={<ShoppingCard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminBook" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
