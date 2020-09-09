import React from "react";
import styles from './header.module.css'
import { logo } from "../../../Assets/Images/images";
import { useHistory, Link } from "react-router-dom";
import authClient from "../../../Auth/Auth";

const Header = (props) => {
    const history = useHistory();
    const isSessionValid = !!authClient.isAuthenticated();
    const signOut = () => {
        authClient.signOut();
        history.push('/');
    };
    return (
        <div className={styles.headerContainer}>
            <img src={logo} className={styles.logoImg} alt="logo" onClick={() => { history.push('/') }} />
            <label className={styles.topLabel} ><span className={styles.labelHighlighter} >Video tours </span> coming soon!!</label>
            <Link to={{
                pathname: '/productList',
                state: { excludeMyproperty: true }
            }} className={styles.myPropLink} >Buy</Link>
            <Link to={{
                pathname: '/userHome'
            }} className={styles.myPropLink} >Sell</Link>
            <Link to={{
                pathname: '/productList'
            }} className={styles.myPropLink} >My Properties</Link>

            <div className={styles.UserProfile}>
                <div className={styles.logInUser} >Welcome {isSessionValid && authClient.getProfile().givenName}!</div>

                <span className={styles.signout} onClick={() => signOut()}>Sign out</span>
            </div>
        </div>
    );
}

export default Header;