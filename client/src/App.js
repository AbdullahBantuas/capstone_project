import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './AdminPages/Dashboard/Dashboard';
import Home from './AdminPages/Home/Home';
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
import UserNavbar from './components/UserNavbar';
import UserHome from './UserPages/UserHome/UserHome';
import UserGeomap from './UserPages/UserGeomap/UserGeomap';
import UserSoil from './UserPages/UserSoil/UserSoil';
import UserResearchers from './UserPages/UserResearchers/UserResearchers';
import ViewSoil3 from './UserPages/UserGeomap/ViewSoil3';
import ViewSoil4 from './UserPages/UserSoil/ViewSoil4';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/geomap" element={<Geomap />} />
        <Route path="/soildata" element={<SoilData />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/addContact" element={<AddEdit />} />
        <Route path="/update" element={<AddEdit />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/addSoil" element={<AddEditSoil />} />
        <Route path="/updateSoil/:id" element={<AddEditSoil />} />
        <Route path="/viewSoil/:id" element={<ViewSoil />} />
        <Route path="/viewSoil2/:id" element={<ViewSoil2 />} />
        <Route path="/researchers" element={<Researchers />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/usergeomap" element={<UserGeomap />} />
        <Route path="/usersoil" element={<UserSoil />} />
        <Route path="/userresearchers" element={<UserResearchers />} />
        <Route path="/viewSoil3/:id" element={<ViewSoil3 />} />
        <Route path="/viewSoil4/:id" element={<ViewSoil4 />} />
      </Routes>
    </Router>
  );
}

const Navigation = React.memo(() => {
  const location = useLocation();
      
  if (location.pathname === '/dashboard') {
    return <Navbar />;
  } else if (location.pathname === '/home'){
    return <Navbar />;
  } else if (location.pathname === '/geomap'){
    return <Navbar />;
  } else if (location.pathname === '/soildata'){
    return <Navbar />;
  } else if (location.pathname === '/userdata'){
    return <Navbar />;
  } else if (location.pathname === '/addContact'){
    return <Navbar />;
  } else if (location.pathname === '/update'){
    return <Navbar />;
  } else if (/\/view\/\d+/.test(location.pathname)){
    return <Navbar />;
  } else if (location.pathname === '/addSoil'){
    return <Navbar />;
  } else if (/\/updateSoil\/\d+/.test(location.pathname)){
    return <Navbar />;
  } else if (/\/viewSoil\/\d+/.test(location.pathname)){
    return <Navbar />;
  } else if (/\/viewSoil2\/\d+/.test(location.pathname)) {
    return <Navbar />;
  } else if (location.pathname === '/researchers'){
    return <Navbar />;
  } else if (location.pathname === '/userhome'){
    return <UserNavbar />;
  } else if (location.pathname === '/usergeomap'){
    return <UserNavbar />;
  } else if (location.pathname === '/usersoil'){
    return <UserNavbar />;
  } else if (location.pathname === '/userresearchers'){
    return <UserNavbar />;
  } else if (/\/viewSoil3\/\d+/.test(location.pathname)) {
    return <UserNavbar />;
  } else if (/\/viewSoil4\/\d+/.test(location.pathname)) {
    return <UserNavbar />;
  } else {
    return null;
  }
});

export default App;
