import React, { useState, useEffect } from "react";
import { API_ENDPOINT_BASE_URL } from './Constants';
import axios from "axios";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function AllBooks() {
  const [tabValue, setTabValue] = React.useState(0);
  const [orderedBooks, setOrderedBooks] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const [bookData, setBookData] = useState({});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const token = localStorage.getItem("access_token") || "";
        const api = axios.create({
            baseURL: API_ENDPOINT_BASE_URL,
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });
        const response = await api.get("/api/dashboard/all-books/");
        setBookData(response.data.books);
        const categories = Object.keys(response.data.books);

        const initialOrderStatus = {};
        categories.forEach((key) => {
          response.data.books[key].forEach((book) => {
            initialOrderStatus[book.id] = response.data.my_books.includes(book.id) ? "Already Ordered" : "Place Order";
          });
        });
        setOrderStatus(initialOrderStatus);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, []);

  const updateOrderStatus = (bookId, status) => {
    setOrderStatus((prevOrderStatus) => ({
      ...prevOrderStatus,
      [bookId]: status,
    }));
  };

  const handlePlaceOrder = (book) => {
    try {
      const token = localStorage.getItem("access_token") || "";
      const api = axios.create({
          baseURL: API_ENDPOINT_BASE_URL,
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          },
      });
      const response = api.post("/api/placeorder/", { book_id: book.id });
      updateOrderStatus(book.id, "Order Placed");

      console.log(`Placing order for ${book.title}`);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <h2>All Books</h2>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        {Object.keys(bookData).map((category, index) => (
          <Tab key={index} label={category} />
        ))}
      </Tabs>
      <AutoPlaySwipeableViews index={tabValue} onChangeIndex={handleTabChange}>
        {Object.keys(bookData).map((category, index) => {
          const books = bookData[category];
          

          return (
            <Paper key={index} elevation={3} sx={{ p: 2, mt: 2 }}>
              <Typography variant="h5" mb={2}>
                {category}
              </Typography>
              <Box display="flex" flexDirection="column">
                {books.map((book, bookIndex) => (
                  <Card key={bookIndex} elevation={3} sx={{ mb: 2 }}>
                    <CardContent>
                      <IconButton color="primary">
                        <span role="img" aria-label="Book Icon">
                          📚
                        </span>
                      </IconButton>
                      <Typography variant="body1" component="span">
                        <b>{book.title}</b> by {book.author}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handlePlaceOrder(book)}
                        disabled={
                          orderStatus[book.id] === "Already Ordered" ||
                          orderStatus[book.id] === "Order Placed"
                        }
                      >
                        {orderStatus[book.id]}
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </Paper>
          );
        })}
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default AllBooks;
