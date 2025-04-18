import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import MainContent from '../maincontent/MainContent'; // Assuming this is your main content component
import urlhelper from '../../utils/urlhelper'; // Assuming this is a function returning URLs
import './navigation.css'
const Navigation = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const featureUrls = urlhelper();

    const toggleNav = () => {
        setIsNavOpen(prevState => !prevState);
    };

    return (
        <div className={`container ${isNavOpen ? 'sidebar-open' : ''}`}>
            <div id="sidebar" className={`sidebar ${isNavOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <img src="/assets/exaze-logo.png" alt="Main Logo" className="main-logo" />
                </div>
                <div className="sidebar-links">
                    <ul className="ul">
                        {featureUrls.map((url) => (
                            <li key={url.id}>
                                <a className="links active" href={`/${url.title.replace(/\s/g, '').toLowerCase()}`} >{url.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sidebar-icon" onClick={toggleNav}>
                    {isNavOpen ? (
                        <MdKeyboardDoubleArrowRight id="arrow-icon" className="arrow-icon" />
                    ) : (
                        <MdKeyboardDoubleArrowLeft id="arrow-icon" className="arrow-icon" />
                    )}
                </div>
                <div className="copyright">
                    <p className="copy">&copy; 2024 Exaze</p>
                    <p className="terms-of-service">Terms Of Service</p>
                    <p className="privacy-policy">Privacy Policy</p>
                </div>
            </div>

            <div className="topbar">
                <nav className="py-3">
                    <div className="topbar-left">
                        <FiMenu className="menu-icon toggleSidebar" onClick={toggleNav} />
                        <h3>Management System</h3>
                    </div>

                    <div className="topbar-right">
                        <FaUserCircle className="user-icon" />
                    </div>
                </nav>

                <MainContent />
            </div>
        </div>
    );
}

export default Navigation;
