import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SoilData from './pages/SoilData';
import UserData from './pages/UserData';
import AddEdit from './pages/AddEdit';
import AddEditSoil from './pages/AddEditSoil';
import View from './pages/View';
import ViewSoil from './pages/ViewSoil';
import SignIn from './login/SignIn';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/soildata" element={<SoilData />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/addContact" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/addSoil" element={<AddEditSoil />} />
        <Route path="/updateSoil/:id" element={<AddEditSoil />} />
        <Route path="/viewSoil/:id" element={<ViewSoil />} />
      </Routes>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();

  // Conditionally render Navbar and Sidebar based on location
  return (
    <>
      {location.pathname === '/' ? null : <Navbar />}
    </>
  );
}

export default App;