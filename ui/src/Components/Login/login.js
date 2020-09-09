import React, { useState } from 'react';
import styles from './login.module.css'
import { useHistory } from "react-router-dom";
import authClient from '../../Auth/Auth';
import GoogleLogin from 'react-google-login';
import * as Constants from '../../Common/Constants';

export default function LogIn() {

    const [isInvalidLogin, setInvalidLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    function handleSubmit(event) {
        authClient.signIn(username, password).then(res => {
            debugger
            if (res && res.UserEmail && history) {
                history.push("/userHome")
            }
            else {
                setInvalidLogin(true)
            }
        });
        event.preventDefault();
    }
    const handleLoginSuccess = (response) => {
        var userProfile = response.profileObj;
        fetch(process.env.REACT_APP_SAVE_USER_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userProfile.email,
                givenName: userProfile.givenName,
                familyName: userProfile.familyName
            }),
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                userProfile.UserEmail = userProfile.email;
                authClient.googleSignIn(userProfile);
                if (res) {
                    history.push("/userHome");
                }
            })
            .catch(error => {
                // console.log(error)
            })
    }
    const handleLoginFaliure = (response) => {

    }

    return (
        <div>
            <div className={styles.mainLabel}> <span className={styles.highlighter}>Magictricks</span> - Buy/Sell your property faster than ever..</div>
            <form onSubmit={handleSubmit} className={styles.container}>
                <h2> Log In</h2>
                {(isInvalidLogin) ?
                    <h4 className={styles.invalidLoginMsg}>Invalid credentials! Please try again.</h4>
                    : null}


                <label htmlFor="username"><b>Username</b></label>
                <input type="text" className={styles.userInput} placeholder="Enter Username"
                    value={username}
                    onChange={e => { setInvalidLogin(false); setUsername(e.target.value) }} required
                />

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" className={styles.userInput} placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} required />

                <button type="submit">Login</button>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GoogleClientId}
                    buttonText="Login with Google"
                    onSuccess={handleLoginSuccess}
                    onFailure={handleLoginFaliure}
                    className={styles.googleBtn} ></GoogleLogin>
            </form>
        </div>
    );
}