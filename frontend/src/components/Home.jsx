import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/shop.png';
import { getUserType } from '../pages/Login';
import Navbar from './Navbar';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
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
                console.log("API Response:", data); // Debugging log

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
            {/* Main Section */}
            <div className="bg-gray-200 text-gray-800 mt-0 mb-0 mx-auto flex flex-col md:flex-row items-center justify-between px-12 py-20 shadow-lg rounded-lg">
                {/* Text Section */}
                <div className="w-full md:w-1/2 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-6">
                        Welcome to
                        <br /> Book Store
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                        BookStore is a user-friendly online platform where book lovers can browse, search, and purchase their favorite books effortlessly. From bestsellers to hidden gems, we offer a wide collection across various genres, ensuring a seamless shopping experience.
                    </p>

                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className="relative overflow-hidden ">
                        <img
                            src={img1}
                            alt="Pharmacy Products"
                            className="w-80 h-80 md:w-96 md:h-96 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Order with Prescription Section */}
            <div className="bg-gray-100 text-gray-800 mx-auto px-8 py-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-center lg:items-start">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-blue-100 rounded-full p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0v-6a2 2 0 00-2-2h-2m-4 0H9a2 2 0 00-2 2v6m0 4h10a2 2 0 002-2H7a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">Order Your Book</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Order your book and let us deliver your books straight to your doorstep.
                    </p>
                    {userType === "user" || userType === "admin" ? (
                    <Link
                        to="/books"
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md shadow-md transition duration-300"
                    >
                        Order
                    </Link>):(<Link
                        to="/login"
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md shadow-md transition duration-300"
                    >
                        Order
                    </Link>)}
                </div>
                
                {/* Right Section */}
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">How does this work?</h3>
                    <ol className="list-decimal pl-6 space-y-3 text-gray-600">
                        <li>
                            <span className="text-gray-800 font-medium">Choose</span> your book.
                        </li>
                        <li>
                            <span className="text-gray-800 font-medium">Add</span> your book to the Cart.
                        </li>
                        <li>
                            <span className="text-gray-800 font-medium">Proceed</span> to checkout.
                        </li>
                        <li>
                            <span className="text-gray-800 font-medium">Relax!</span> Your books will get delivered to your doorstep.
                        </li>
                    </ol>
                </div>
            </div>
            {/* books section */}
            <div className="bg-gray-100 h-1/2 flex flex-col">
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
                                        <div key={book.id} className="doctor-card bg-gray-100 p-6 rounded-lg">
                                            <div className='px-4 py-4 shadow shadow-slate-800 rounded-lg'>
                                                <h3 className="text-2xl font-bold text-black-700">{book.title}</h3>
                                                <p className="mt-2 text-black-600 font-bold">{book.description}</p>
                                                <p className="mt-2 text-black-600 font-bold">Price:  ${book.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            {/* Why Choose Us Section */}
            <div className="bg-gray-100 text-gray-800 py-16 px-8 mx-auto rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-bold mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-yellow-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span className="text-yellow-500 text-4xl font-bold">46 Million+</span>
                        <p className="text-gray-600">Registered users as of Oct 31, 2024</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 21l-8-4-8 4V5a2 2 0 012-2h12a2 2 0 012 2z"
                            />
                        </svg>
                        <span className="text-green-500 text-4xl font-bold">66 Million+</span>
                        <p className="text-gray-600">Orders on CareWell till date</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 12H4"
                            />
                        </svg>
                        <span className="text-blue-500 text-4xl font-bold">60,000+</span>
                        <p className="text-gray-600">Unique items sold in the last 6 months</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 19V6a2 2 0 012-2h2a2 2 0 012 2v13m-2 0h-4"
                            />
                        </svg>
                        <span className="text-red-500 text-4xl font-bold">19,000+</span>
                        <p className="text-gray-600">Pin codes serviced in the last 3 months</p>
                    </div>
                </div>
            </div>
            <footer className="bg-blue-600 text-white p-4 text-center">
                © 2025 BookStore - Your Online Book Haven. All rights reserved.
            </footer>
        </>
    );
};

export default Home;
