import * as Constants from '../Common/Constants';

class Auth {
    constructor() {
        this.authURL = process.env.REACT_APP_USER_LOGIN_URL;
        this.getProfile = this.getProfile.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        return JSON.parse(localStorage.getItem("SessionIsValid"));
    }
    isAuthenticated() {
        return !!JSON.parse(localStorage.getItem("SessionIsValid"));
    }

    signIn(username, password) {
        return new Promise((resolve, reject) => {
            fetch(this.authURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: username
                })
            })
                .then(res => res.json())
                .then(res => {
                    debugger;
                    if (res.UserEmail) {
                        this.profile = res;
                        localStorage.setItem("SessionIsValid", JSON.stringify(res));
                    }
                    resolve(res);
                })
        });
    }
    googleSignIn(user) {
        localStorage.setItem("SessionIsValid", JSON.stringify(user));
    }

    signOut() {
        localStorage.removeItem("SessionIsValid");
        this.profile = null;

    }
}

const authClient = new Auth();
export default authClient;