import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUserType } from "./Login";

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const userType = getUserType(); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch Book: ${response.status}`);
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details");
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      alert("Book deleted successfully");
      navigate("/books"); // Redirect to book list
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Error deleting book");
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: id }), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add book to cart");
      }
  
      alert("Book added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert(err.message);
    }
  };
  
  

  if (error) return <div>{error}</div>;
  if (!book) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center">
        <main className="flex-grow w-full max-w-3xl p-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
          >
            Back
          </button>

          <div className="bg-white p-8 rounded-xl shadow-md relative">
            {/* Admin: Edit & Delete Buttons */}
            {userType === "admin" && (
              <div className="absolute top-4 right-4 flex space-x-2">
                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/books/edit/${id}`)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M5 6l1 14c0 .6.4 1 1 1h10c.6 0 1-.4 1-1l1-14" />
                  </svg>
                </button>
              </div>
            )}

            {/* User: Add to Cart Button */}
            {userType === "user" && (
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleAddToCart}
                  className="group bg-green-600 text-white p-2 rounded hover:bg-green-700 flex items-center relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.6 13.6a1 1 0 0 0 1 .8h11a1 1 0 0 0 1-.8L23 6H6" />
                  </svg>
                </button>
              </div>
            )}

            <h2 className="text-3xl font-bold text-black mb-4">{book.title}</h2>
            <p className="text-lg text-gray-700">{book.description}</p>
            <p className="text-lg font-bold mt-4">Price: ${book.price}</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default BookDetailsPage;