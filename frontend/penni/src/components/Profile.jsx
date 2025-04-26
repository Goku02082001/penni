import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Profile = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log( "token :",token)
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const res = await axios.get("https://penni.onrender.com/api/getuserData", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }              
        });

        const { data } = res;

        if (data && data.user) {
          setUserData({
            userName: data.user.userName,
            email: data.user.email,
          });
        } else {
          console.error("User data not found in response");
        }

      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm w-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 text-4xl font-bold">
              {userData.userName ? userData.userName.charAt(0) : ''}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800">{userData.userName}</h2>
              <p className="text-gray-500">{userData.email}</p>
            </div>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
