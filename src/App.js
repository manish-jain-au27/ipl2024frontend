import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import FormComponent from './components/Form';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        {/* <Route path="/Form" element={<FormComponent />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

const Home = () => {
  return <h1>Welcome to the Home Page</h1>;
};

export default App;
