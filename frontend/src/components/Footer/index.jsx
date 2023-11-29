import React from "react";
import styles from './Footer.module.scss';
import {Link} from "react-router-dom";

export const Footer = () => {
    return (
        <footer className={`py-3 my-4`}>
            <ul className={`nav justify-content-center border-bottom pb-3 mb-3`}>
                <li className={`nav-item`}>
                    <Link to={"/"} className={`nav-link px-2 text-muted`}>Home</Link>
                </li>
                <li className={`nav-item`}>
                    <Link to={"/shop"} className={`nav-link px-2 text-muted`}>Shop</Link>
                </li>
                <li className={`nav-item`}>
                    <Link to={"/about"} className={`nav-link px-2 text-muted`}>About</Link>
                </li>
                <li className={`nav-item`}>
                    <Link to={"/faqs"} className={`nav-link px-2 text-muted`}>FAQs</Link>
                </li>
            </ul>
            <p className={`text-center text-muted`}>© {new Date().getFullYear()} GameMart, Inc</p>
        </footer>
    );
}