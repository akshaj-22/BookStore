import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserType } from "../pages/Login";
import { toast } from "react-toastify";
import { FiMenu, FiX } from "react-icons/fi"; // Importing icons

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const userType = getUserType();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout", {
            method: "GET",
            credentials: "include",
        });
        toast.success("Logged out successfully");
        navigate("/login");
        setMenuOpen(false); // Close menu on logout
    };

    return (
        <div className="bg-white shadow sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6 md:px-10">
                {/* Hamburger Menu Button (Mobile View) */}
                <button 
                    className="md:hidden text-2xl text-gray-800"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Logo */}
                <div className="text-xl md:text-2xl font-bold text-gray-800">
                    📚 Bookstore
                </div>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
                    <li><Link to="/" className="hover:text-blue-600 transition duration-200">Home</Link></li>
                    {userType === "user" && (
                    <li><Link to="/profile" className="hover:text-blue-600 transition duration-200">Profile</Link></li>
                    )}
                    {userType === "admin" && (
                    <li><Link to="/profile" className="hover:text-blue-600 transition duration-200">Profile</Link></li>
                    )}
                    <li><Link to="/books" className="hover:text-blue-600 transition duration-200">Books</Link></li>
                    {userType === "admin" && (
                        <li><Link to="/add-book" className="hover:text-blue-600 transition duration-200">Add Book</Link></li>
                    )}
                    {userType === "user" && (
                        <li><Link to="/cart" className="hover:text-blue-600 transition duration-200">Cart</Link></li>
                    )}
                </ul>

                {/* Desktop Login/Logout Button */}
                <div className="hidden md:block">
                    {userType === "user" || userType === "admin" ? (
                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-4">
                    <ul className="flex flex-col items-center space-y-4 text-gray-700 font-medium">
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                        {userType === "user" && (
                        <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                        )}
                        {userType === "admin" && (
                        <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                        )}
                        <li><Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link></li>
                        {userType === "admin" && (
                            <li><Link to="/add-book" onClick={() => setMenuOpen(false)}>Add Book</Link></li>
                        )}
                        {userType === "user" && (
                            <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
                        )}
                        <li>
                            {userType === "user" || userType === "admin" ? (
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition duration-200"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link 
                                    to="/login" 
                                    onClick={() => setMenuOpen(false)} 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition duration-200"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
