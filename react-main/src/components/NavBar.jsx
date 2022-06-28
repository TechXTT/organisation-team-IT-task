import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { LoggedSideBarData } from './data/LoggedSideBarData';
import { SideBarData } from './data/SideBarData';
import '../css/NavBar.css';
import { IconContext } from 'react-icons';

function Navbar({ logged }) {
    const [sideBar, setSideBar] = useState(false);
    const [sideBarData, setSideBarData] = useState([]);
    useEffect(() => {
        if (!logged) {
            setSideBarData(SideBarData);
        }
        else {
            setSideBarData(LoggedSideBarData);
        }
    }, [logged]);
    const showSideBar = () => setSideBar(!sideBar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar w-screen bg-slate-900'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSideBar} />
                    </Link>
                </div>
                <nav className={sideBar ? 'nav-menu active bg-slate-900' : 'nav-menu bg-slate-900'}>
                    <ul className='nav-menu-items' onClick={showSideBar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {sideBarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
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