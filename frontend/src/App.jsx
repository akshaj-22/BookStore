import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import ViewProfilePage from "./pages/ViewProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ViewBooksPage from "./pages/ViewBooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import EditBookPage from "./pages/EditBookPage";
import CartPage from "./pages/CartPage";
import AddBookPage from "./pages/AddBookPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
      <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/sign-up" element={<SignupPage/>}/>
          <Route path="/profile" element={<ViewProfilePage/>}/>
          <Route path="/edit-profile" element={<EditProfilePage/>}/>
          <Route path="/books" element={<ViewBooksPage/>}/>
          <Route path="/books/:id" element={<BookDetailsPage/>} />
          <Route path="/books/edit/:id" element={<EditBookPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      </>
  );
}

export default App;