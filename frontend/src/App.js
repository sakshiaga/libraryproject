import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm'; // Import your login form component
import Dashboard from './Dashboard'; // Import your dashboard component
import AllBooks from './AllBooks'; // Import your AllBooks component
import MyBooks from './MyBooks'; // Import your MyBooks component

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/" element={<SignupForm />} />

          <Route path="/login" element={<LoginForm />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/my-books" element={<MyBooks />} />
            <Route path="/dashboard/all-books" element={<AllBooks />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
