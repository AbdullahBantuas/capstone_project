import React from 'react';
import { MdDashboard } from "react-icons/md";
import { FiDatabase, FiUsers, FiMapPin } from "react-icons/fi";
import { FaSistrix } from "react-icons/fa";

export const SidebarData = [
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