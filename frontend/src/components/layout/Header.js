import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/Header.css';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="site-header">
            <div className="container">
                <nav className="main-nav">                    {/* Logo/Brand */}
                    <Link to="/" className="brand">
                        <h2><i className="fas fa-blog"></i> My Blog</h2>
                    </Link>

                    {/* Navigation Links */}
                    <div className="nav-links">
                        <Link
                            to="/"
                            className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        >
                            <i className="fas fa-home"></i> Home
                        </Link>
                        <Link
                            to="/blog"
                            className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
                        >
                            <i className="fas fa-newspaper"></i> Blog
                        </Link>                        <Link
                            to="/create"
                            className={`nav-link ${isActive('/create') ? 'active' : ''}`}
                        >
                            <i className="fas fa-pen-nib"></i> Write
                        </Link>
                        <Link
                            to="/profile"
                            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                        >
                            <i className="fas fa-user"></i> Profile
                        </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="nav-actions">                        <Link to="/create" className="btn btn-primary btn-small">
                        <i className="fas fa-pen-nib"></i> New Post
                    </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
