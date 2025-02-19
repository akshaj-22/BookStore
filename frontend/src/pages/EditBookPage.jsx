import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", description: "", price: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch book");
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

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      alert("Book updated successfully!");
      navigate(`/books/${id}`);
    } catch (err) {
      console.error("Error updating book:", err);
      alert("Error updating book");
    }
  };

  if (error) return <div>{error}</div>;
  if (!book) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center">
        <main className="flex-grow w-full max-w-3xl p-6">
          <h2 className="text-3xl font-bold text-black mb-4">Edit Book</h2>

          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 mb-4 border rounded"
          />

          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 mb-4 border rounded"
          />

          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 mb-4 border rounded"
          />

          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            Update
          </button>
        </main>
      </div>
    </>
  );
};

export default EditBookPage;
