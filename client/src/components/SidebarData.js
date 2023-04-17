import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { FiDatabase, FiUsers, FiMapPin } from "react-icons/fi";
import { FaSistrix } from "react-icons/fa";

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
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