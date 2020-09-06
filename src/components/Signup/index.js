import React from 'react';
import { Input, Button, Modal } from '@material-ui/core';
import {auth} from '../../firebase';
import './style.scss';

function Signup({setOpenSignup, classes, isNewUser}) {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signUp = (e) => {
        e.preventDefault();

        let signupPromise;

        if (isNewUser) {
            signupPromise = auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                return authUser.user.updateProfile({
                    displayName: username
                });
            });
        } else {
            signupPromise = auth.signInWithEmailAndPassword(email, password);
        }
        signupPromise.catch(err => alert(err.message));
    }

    return (
        <Modal open={true} onClose={() => setOpenSignup(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div className={classes.paper}>
                <form className="signup" onSubmit={signUp}>
                    <center>
                        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" className="app__header-image"/>
                    </center>
                    {isNewUser && <Input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />}
                    <Input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button type="submit">{isNewUser ? 'Sign up' : 'Sign in'}</Button>
                </form>
            </div>
        </Modal>
    );
}

export default Signup;