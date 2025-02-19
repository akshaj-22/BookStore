import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EditProfilePage = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/profile', {
                    method: 'GET',
                    credentials: 'include', 
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
        
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({
                    name: profile.name,
                    email: profile.email,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            const data = await response.json();
            alert(data.message); 
            navigate('/profile'); 
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    

    return (
        <>
        <Navbar/>
        <div className="bg-gray-100 h-screen flex flex-col w-full">
            <h1 className="text-2xl text-center text-gray-900 font-bold mb-6 mt-5">Edit Profile</h1>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 shadow-xl rounded-lg">
                <div className="mb-4">
                    <label className="block text-lg text-gray-800 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-lg font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-700 text-white font-bold py-2 px-2 rounded shadow shadow-gray-800"
                >
                    Save Changes
                </button>
            </form>
            </div>
            </>    
    );
};

export default EditProfilePage;