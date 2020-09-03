import React from 'react';
import { Input, Button, Modal } from '@material-ui/core';
import {auth} from './firebase';
import './styles/Signup.scss';

function Signin({setOpenSignin, classes}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .catch(err => alert(err.message)); 
    }

    return (
        <Modal open={true} onClose={() => setOpenSignin(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div className={classes.paper}>
                <form className="signup" onSubmit={signIn}>
                    <center>
                        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" className="app__header-image"/>
                        </center>
                        <Input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Input type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button type="submit">Sign in</Button>
                </form>
            </div>
      </Modal>
    );
}

export default Signin;