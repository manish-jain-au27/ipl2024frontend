import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
