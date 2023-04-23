import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './AdminPages/Dashboard/Dashboard';
import SoilData from './AdminPages/SoilData/SoilData';
import UserData from './AdminPages/UserData/UserData';
import AddEdit from './AdminPages/UserData/AddEdit';
import AddEditSoil from './AdminPages/SoilData/AddEditSoil';
import View from './AdminPages/UserData/View';
import ViewSoil from './AdminPages/SoilData/ViewSoil';
import ViewSoil2 from './AdminPages/Geomap/ViewSoil2';
import SignIn from './login/SignIn';
import Geomap from './AdminPages/Geomap/Geomap';
import Researchers from './AdminPages/Researchers/Researchers';
import Home from './UserPages/Home';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/geomap" element={<Geomap />} />
        <Route path="/soildata" element={<SoilData />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/addContact" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/addSoil" element={<AddEditSoil />} />
        <Route path="/updateSoil/:id" element={<AddEditSoil />} />
        <Route path="/viewSoil/:id" element={<ViewSoil />} />
        <Route path="/viewSoil2/:id" element={<ViewSoil2 />} />
        <Route path="/researchers" element={<Researchers />} />
        <Route path="/home" element={<Home />} />
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