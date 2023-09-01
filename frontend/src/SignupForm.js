import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './SignupForm.css'; // Import the CSS file for styling
import { API_ENDPOINT_BASE_URL } from './Constants';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


function SignupForm() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        college: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = axios.create({
                baseURL: API_ENDPOINT_BASE_URL,
                headers: {
                "Content-Type": "application/json",
                },
            });
            const response = await api.post('/api/signup/', formData);
            console.log(response.data);
            navigate('/login');
            setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.email) {
                setErrorMessage('Email address already exists. Please enter a different email.');
            } else {
                setErrorMessage('An error occurred during signup.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
    <div className="form-container">
            <h1>Library Management <center>Sign Up</center></h1>
        <form className="vertical-form" onSubmit={handleSubmit}>
            <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <TextField
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <TextField
                name="college"
                label="College"
                value={formData.college}
                onChange={handleChange}
                required
            />
            <TextField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Sign Up
            </Button>
            <p>{errorMessage}</p>
            <Link to="/login" className="login-link">
                Already a user? Login
            </Link>
        </form>
    </div>
    );
}

export default SignupForm;
