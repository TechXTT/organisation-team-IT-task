import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <FaIcons.FaSignInAlt />,
        cName: 'nav-text login'
    },
    {
        title: 'Register',
        path: '/register',
        icon: <FaIcons.FaUserPlus />,
        cName: 'nav-text registered'
    }
];