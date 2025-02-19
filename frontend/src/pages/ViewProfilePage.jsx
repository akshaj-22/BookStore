import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

const ViewProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
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
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);


  if (error) return <div>{error}</div>;

  if (!profile) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 h-screen flex flex-col items-center">
        <main className="flex-grow w-full max-w-3xl p-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
          >
            Back
          </button>

          <h2 className="text-2xl font-bold mb-4">Profile</h2>

          <div className="bg-white p-8 rounded shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <p className="text-gray-700 mb-2"><strong>Name:</strong> {profile.name}</p>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> {profile.email}</p>
            <Link to="/edit-profile" className="bg-green-500 px-4 py-2 rounded-lg text-white mt-4 inline-block font-semibold">Edit Profile</Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default ViewProfilePage;