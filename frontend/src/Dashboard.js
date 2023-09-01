import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import axios from "axios";
import { API_ENDPOINT_BASE_URL } from './Constants';
import { useNavigate } from 'react-router-dom';

import Profile from "./Profile";
import MyBooks from "./MyBooks";
import AllBooks from "./AllBooks";

const Sidebar = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("access_token") || "";
        const api = axios.create({
            baseURL: API_ENDPOINT_BASE_URL,
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });

        const response = await api.get("/api/dashboard/");
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    let route = '/dashboard/my-books';
    if (newValue === 1) {
      route = '/dashboard/all-books';
    }
    if (newValue === 0) {
      route = '/dashboard/my-books';
    }
    navigate(route);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
      >
        <Tab label="My Books" to="/dashboard/my-books" />
        <Tab label="All Books" to="/dashboard/all-books" />
      </Tabs>

      <h2>Hello <i>{userDetails.name}</i></h2>
      <Box p={8}>
        {tabValue === 0 && (
          <div>
          <MyBooks />
        </div>
        )}
        {tabValue === 1 && (
          <div>
            <AllBooks />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
