import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SoilData from './pages/SoilData';
import UserData from './pages/UserData';
import AddEdit from './pages/AddEdit';
import AddEditSoil from './pages/AddEditSoil';
import View from './pages/View';
import ViewSoil from './pages/ViewSoil';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/soildata' element={<SoilData/>} />
          <Route path='/userdata' element={<UserData/>} />
          <Route path='/addContact' element={<AddEdit/>} />
          <Route path='/update/:id' element={<AddEdit/>} />
          <Route path='/view/:id' element={<View/>} />
          <Route path='/addSoil' element={<AddEditSoil/>} />
          <Route path='/updateSoil/:id' element={<AddEditSoil/>} />
          <Route path='/viewSoil/:id' element={<ViewSoil/>} />
        </Routes>
      </Router>
    </>

  );
}

export default App;