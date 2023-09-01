import React from 'react';
import { Link, Route, Routes, Route as NavigateRoute } from 'react-router-dom'; // Import Routes and Route components

import MyBooks from './MyBooks';
import AllBooks from './AllBooks';

const token = localStorage.getItem('access_token'); // Fetch token from local storage
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

function Profile() {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <Link to="/dashboard/profile">Profile</Link>
                <Link to="/dashboard/my-books">My Books</Link>
                <Link to="/dashboard/all-books">All Books</Link>
            </div>
            <div className="content">
                <Routes>
                    {/* Use NavigateRoute instead of Route */}
                    <NavigateRoute path="/dashboard/profile" element={<Profile />} />
                    <NavigateRoute path="/dashboard/my-books" element={<MyBooks />} />
                    <NavigateRoute path="/dashboard/all-books" element={<AllBooks />} />
                </Routes>
            </div>
        </div>
    );
}

export default Profile;
