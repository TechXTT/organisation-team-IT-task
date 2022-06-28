import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const LoggedSideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Workspaces',
        path: '/workspaces',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'To-Do',
        path: '/todo',
        icon: <IoIcons.IoIosList />,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
        path: '/calendar',
        icon: <IoIcons.IoIosCalendar />,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <IoIcons.IoIosSettings />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <IoIcons.IoMdLogOut />,
        cName: 'nav-text logout'
    }
];