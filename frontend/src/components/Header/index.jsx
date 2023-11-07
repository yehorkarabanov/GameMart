import React, {useEffect} from "react";
import styles from './Header.module.scss';
import {LoginModal} from "../LoginModal";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkTokens} from "../../redux/slices/userSlice";

export const Header = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
    const [showLoginModal, setShowLoginModal] = React.useState(false);
    const handleLoginModalShow = () => setShowLoginModal(true);
    const handleMobileNavToggle = () => setIsMobileNavOpen(!isMobileNavOpen);

    useEffect(() => {
        console.log(1213);
        if (user.isLogin) {
            dispatch(checkTokens());
        }
    },[]);

    return (
        <>
            <header className={`d-flex align-items-center`}>
                <div className="container d-flex align-items-center justify-content-between">
                    <div className={`${styles.logo}`}>
                        <h1><Link to={"/"}><span>GameMart</span></Link></h1>
                    </div>
                    <nav className={`${styles.navbar} ${isMobileNavOpen ? styles.navbarMobile : ''}`}>
                        <ul>
                            <li><Link to={"/"} className={`nav-link ${styles.active}`}>Home</Link></li>
                            <li><Link to={"shop/"} className={`nav-link`}>Shop</Link></li>
                            <li>
                                <div className={`input-group rounded ${styles.navbarSearch}`}>
                                    <input type="search" id="search" className="form-control" placeholder="Search"
                                           aria-label="Search" aria-describedby="search-addon"/>
                                    <span className="input-group-text border-0" id="search-addon">
                                    <box-icon name='search-alt-2'></box-icon>
                                </span>
                                </div>
                            </li>
                            <li>
                                {user.isLogin ?
                                    <Link to={"account/"} className={`nav-link`}>{user.userdata.username}</Link>
                                    : <button className={`nav-link`}
                                              onClick={handleLoginModalShow}>Login/Register</button>}

                            </li>
                            <li>
                                <Link to={"cart/"} className={`${styles.cart}`}>
                                    <box-icon name='cart'></box-icon>
                                    <div>12</div>
                                </Link>
                            </li>
                            <li>
                                <Link to={"like/"}>
                                    <box-icon name='heart'></box-icon>
                                </Link>
                            </li>
                        </ul>
                        <i className={`bi ${!isMobileNavOpen ? 'bi-list' : 'bi-x'} ${styles.navbarMobileToggle}`}
                           onClick={handleMobileNavToggle}
                           style={{color: isMobileNavOpen ? 'white' : 'black'}}></i>
                    </nav>
                </div>
            </header>

            {user.isLogin ? <></> : <LoginModal {...{showLoginModal, setShowLoginModal}}/>}
        </>
    );
}