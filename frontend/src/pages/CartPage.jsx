import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import icon from "../assets/images/checkout.png";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [checkout, setCheckout] = useState(false); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          credentials: "include",
        });
    
        const data = await response.json();
        console.log("Cart Items:", data); 
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart items");
      }
    };
    

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (cartId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove book from cart");
      }

      // Remove only the selected book without affecting others
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== cartId));
    } catch (err) {
      console.error("Error removing book:", err);
      alert("Error removing book");
    }
  };

  const handleCheckout = () => {
    setCheckout(true);
  };

  if (error) return <div>{error}</div>;
  if (!cartItems.length) 
    return(
    <> 
    <Navbar/> 
    <div className="h-screen flex flex-col items-center">
        <main className="flex-grow w-full max-w-3xl p-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
          >
            Back
          </button>

          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

          <div className="text-center">
            Your cart is empty
          </div>
        </main>
      </div>
    </>);
  

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

          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-md mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{item.Book.title}</h3>
                  <p className="text-gray-700">{item.Book.description}</p>
                  <p className="font-bold mt-2">Price: ${item.Book.price}</p>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {!checkout ? (
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          ) : (
            <div className="mt-6 flex flex-col items-center">
              <img src={icon} alt="Checkout" className="w-48" />
              <p className="text-lg font-bold mt-2">Proceeding to checkout...</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default CartPage;
