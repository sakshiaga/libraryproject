import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { API_ENDPOINT_BASE_URL } from './Constants';
import { Link } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginForm() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await axios.post('http://localhost:8000/api/login/', formData);
            const token = response.data.access;
            console.log('Access token:', token);
            localStorage.setItem('access_token', token);
            localStorage.setItem('refresh_token', response.data.refresh);
            setErrorMessage('');
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.non_field_errors) {
                setErrorMessage('Invalid email or password.');
            } else {
                setErrorMessage('An error occurred during login.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="form-container">
            <h1>Library Management <center>Login</center></h1>
            <form className="vertical-form" onSubmit={handleSubmit}>
                <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
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
                    Login
                </Button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Link to="/" className="signup-link">
                New user? Signup
                </Link>
            </form>
        </div>
    );
}

export default LoginForm;
