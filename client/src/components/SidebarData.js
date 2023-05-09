import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FiDatabase, FiUsers, FiMapPin } from "react-icons/fi";
import { FaSistrix } from "react-icons/fa";
import HomeIcon from '@mui/icons-material/Home';
import yourLogo from '../imgs/5hz1_ve61_221010.jpg';
export const SidebarData = [
  {
    icon: <img src={yourLogo} alt="Your Logo" style={{ marginLeft: '60px',width: '100px', height: 'auto', paddingBottom: '20px' }} />,
    cName: 'nav-logo',
    logoStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
  },
  {
    title: 'Home',
    path: '/home',
    icon: <HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Geomap',
    path: '/geomap',
    icon: <FiMapPin />,
    cName: 'nav-text'
  },
  {
    title: 'Soil Data',
    path: '/soildata',
    icon: <FiDatabase />,
    cName: 'nav-text'
  },
  {
    title: 'User Data',
    path: '/userdata',
    icon: <FiUsers />,
    cName: 'nav-text'
  },
  {
    title: 'Researchers',
    path: '/researchers',
    icon: <FaSistrix />,
    cName: 'nav-text'
  }
];

const Sidebar = () => {
  return (
    <div>
      <ul className="sidebar">
        <li className="nav-logo">
          <a href="/">
            {yourLogo}
          </a>
        </li>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <a href={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
