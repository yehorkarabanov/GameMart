import React from "react";
import styles from './Header.module.scss';

export const Header = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
    const handleMobileNavToggle = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    }

    return (
        <header className={`d-flex align-items-center`}>
            <div className="container d-flex align-items-center justify-content-between">
                <div className={`${styles.logo}`}>
                    <h1><span>GameMart</span></h1>
                </div>
                <nav className={`${styles.navbar} ${isMobileNavOpen ? styles.navbarMobile : ''}`}>
                    <ul>
                        <li><a href='#' className={`nav-link ${styles.active}`}>Home</a></li>
                        <li><a href='#' className={`nav-link`}>Shop</a></li>
                        <li>
                            <div className={`input-group rounded ${styles.navbarSearch}`}>
                                <input type="search" id="search" className="form-control" placeholder="Search"
                                       aria-label="Search" aria-describedby="search-addon"/>
                                <span className="input-group-text border-0" id="search-addon">
                                    <box-icon name='search-alt-2'></box-icon>
                                </span>
                            </div>
                        </li>
                        <li><a href='#' className={`nav-link`}>Login/Register</a></li>
                        <li>
                            <a href="#" className={`${styles.cart}`}>
                                <box-icon name='cart'></box-icon>
                                <div>12</div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <box-icon name='heart'></box-icon>
                            </a>
                        </li>
                    </ul>
                    <i className={`bi ${!isMobileNavOpen ? 'bi-list' : 'bi-x'} ${styles.navbarMobileToggle}`}
                       onClick={handleMobileNavToggle}
                       style={{ color: isMobileNavOpen ? 'white' : 'black' }}></i>
                </nav>
            </div>
        </header>
    );
}