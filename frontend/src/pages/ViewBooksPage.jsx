import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { getUserType } from './Login';

const ViewBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userType = getUserType();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch Books: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data && Array.isArray(data.books)) {
          setBooks(data.books);
          setFilteredBooks(data.books);
        } else {
          throw new Error('Invalid books data');
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books');
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );

    setFilteredBooks(filtered);
  };

  if (error) return <div>{error}</div>;
  if (!Array.isArray(books) || books.length === 0) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col">
        <main className="flex-grow flex flex-col items-center">
          <div className="w-full p-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by book title"
              className="w-full p-2 mb-4 ml-2 rounded-2xl ring-2 ring-blue-500/50 hover:ring-blue-500 outline-none"
            />
            <div className="bg-gray-100 p-8 rounded-xl m-2 w-full">
              <h2 className="text-3xl font-bold text-black mb-6 text-center">Available Books</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                  <Link to={`/books/${book.id}`} key={book.id} className="block">
                    <div className="doctor-card bg-white p-6 shadow shadow-black-800 rounded-lg cursor-pointer hover:shadow-lg transition">
                      <div className='px-4 py-4 shadow shadow-slate-800 rounded-lg'>
                        <h3 className="text-2xl font-bold text-black-700">{book.title}</h3>
                        <p className="mt-2 text-black-600 font-bold">{book.description}</p>
                        <p className="mt-2 text-black-600 font-bold">Price:  ${book.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          © 2024 BookStore. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default ViewBooksPage;
