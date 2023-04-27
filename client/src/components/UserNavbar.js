import React, { useState, useRef, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './UserSidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function UserNavbar() {
  const [sidebar, setSidebar] = useState(false);
  const navbarRef = useRef(null);
  const sidebarRef = useRef(null);

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
      <IconContext.Provider value={{ color: '#fff' }}>
        <div ref={navbarRef} className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} style={{ marginLeft: '-20px' }}/>
          </Link>
          <div className='nav-title'>GIS-Based Data Management For Soil Quality Index</div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul
            ref={sidebarRef}
            className="nav-menu-items"
            onClick={showSidebar}
          >
            {/* <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
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

export default UserNavbar;
