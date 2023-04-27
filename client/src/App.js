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
import UserNavbar from './components/UserNavbar';
import UserHome from './UserPages/UserHome/UserHome';
import UserGeomap from './UserPages/UserGeomap/UserGeomap';
import UserSoil from './UserPages/UserSoil/UserSoil';
import UserResearchers from './UserPages/UserResearchers/UserResearchers';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<SignIn />} />
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
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/usergeomap" element={<UserGeomap />} />
        <Route path="/usersoil" element={<UserSoil />} />
        <Route path="/userresearchers" element={<UserResearchers />} />
      </Routes>
    </Router>
  );
}

const Navigation = React.memo(() => {
  const location = useLocation();
      
  if (location.pathname === '/dashboard') {
    return <Navbar />;
  } else if (location.pathname === '/geomap'){
    return <Navbar />;
  } else if (location.pathname === '/soildata'){
    return <Navbar />;
  } else if (location.pathname === '/userdata'){
    return <Navbar />;
  } else if (location.pathname === '/addContact'){
    return <Navbar />;
  } else if (location.pathname === '/update/:id'){
    return <Navbar />;
  } else if (location.pathname === '/view/:id'){
    return <Navbar />;
  } else if (location.pathname === '/addSoil'){
    return <Navbar />;
  } else if (location.pathname === '/updateSoil/:id'){
    return <Navbar />;
  } else if (location.pathname === '/viewSoil/:id'){
    return <Navbar />;
  } else if (location.pathname === '/viewSoil2/:id'){
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
  } else {
    return null;
  }
});

export default App;
