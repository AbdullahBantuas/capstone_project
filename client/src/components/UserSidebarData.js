import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FiDatabase, FiUsers, FiMapPin } from "react-icons/fi";
import { FaSistrix } from "react-icons/fa";
import yourLogo from '../imgs/LOGO_SA_RANAW-removebg-preview (2).png';
export const SidebarData = [
  {
    icon: <img src={yourLogo} alt="Your Logo" style={{ marginLeft: '60px',width: '100px', height: '100px', paddingBottom: '20px', transform: 'scale(1.3)' }} />,
    cName: 'nav-logo',
    logoStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' }
  },
  {
    title: 'Home',
    path: '/userhome',
    icon: <MdDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Geomap',
    path: '/usergeomap',
    icon: <FiMapPin />,
    cName: 'nav-text'
  },
  {
    title: 'Soil Data',
    path: '/usersoil',
    icon: <FiDatabase />,
    cName: 'nav-text'
  },
  {
    title: 'Researchers',
    path: '/userresearchers',
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
