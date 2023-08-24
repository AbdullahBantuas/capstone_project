import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './UserSidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
import axios from "axios";

const handleLogoutClick = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = '/';
    }
  });
};

function UserDropdown() {
  return (
    <div className="user-dropdown">
      {/* <span className='nav-title'>USER</span> */}
      <button>
        <FaUserCircle />
      </button>
      <ul className="user-dropdown-menu" style={{ listStyle: 'none' }}>
        <li>
          <Link to="/user"><AccountCircleIcon/>Profile</Link>
        </li>
        <li>
          <Link onClick={handleLogoutClick}><LogoutIcon/>Logout</Link>
        </li>
      </ul>
    </div>
  );
}

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navbarRef = useRef(null);
  const sidebarRef = useRef(null);
  const [user, setUser] = useState({});
  const U_id = localStorage.getItem('U_id');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${U_id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [U_id]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      setSidebar(false);
    }
  };

  const showSidebar = () => setSidebar(!sidebar);

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setSidebar(false);
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff'}}>
        <div ref={navbarRef} className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaBars onClick={showSidebar} style={{ marginLeft: '-20px' }}/>
          </Link>
          <div className='nav-title'>GIS-Based Data Management For Soil Quality Index Of The Agricultural Land In Marawi City</div>
          <UserDropdown />
          <div className='nav-name'>{user.Fullname}</div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul
            ref={sidebarRef}
            className="nav-menu-items"
            onClick={showSidebar}
          >
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} onClick={handleButtonClick}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

