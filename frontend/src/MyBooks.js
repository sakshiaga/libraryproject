import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT_BASE_URL } from './Constants';

function MyBooks() {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    // Fetch the user's added books from the server
    const fetchBookData = async () => {

      const token = localStorage.getItem("access_token") || "";
      const api = axios.create({
          baseURL: API_ENDPOINT_BASE_URL,
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          },
      });
      api.get('/api/dashboard/my-books/')
        .then(response => {
          setUserBooks(response.data.books);
        })
        .catch(error => {
          console.error('Error fetching user books:', error);
        });
      };
      fetchBookData();
  }, []);

  return (
    <div>
      <h3>My Books</h3>
      {userBooks.length > 0 ? (
        <ul>
          {userBooks.map((book, index) => (
            <li key={index}><b>{book.title}</b> by {book.author}</li>
          ))}
        </ul>
      ) : (
        <p>No books ordered yet.</p>
      )}
    </div>
  );
}

export default MyBooks;
