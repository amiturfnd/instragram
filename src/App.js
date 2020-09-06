import React, {useState, useEffect} from 'react';
import './styles/App.scss';
import {db, auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Button, Modal } from '@material-ui/core';
import Post from './components/Post';
import Signup from './components/Signup';
import ImageUpload from './components/ImageUpload';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

function App() {
  const [user, setUser] = React.useState("");
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const [openSignup, setOpenSignup] = React.useState(false);
  const [isNewUser, setIsNewUser] = React.useState(false);

  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})));
    });
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
        if(authUser) {
            setUser(authUser);
            setOpenSignup(false);
        } else {
            // user has logged out...
            setUser(null);
        }
    });

    return () => {
        unsubscribe();
    }
  }, [user]);

  return (
    <div className="app">
      {openSignup && <Signup user={user} setUser={setUser} setOpenSignup={setOpenSignup} classes={classes} isNewUser={isNewUser} />}

      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo" className="app__header-image"/>
        {user ? (
          <Button onClick={() => auth.signOut()}>Sign out</Button>
        ) : (
          <div className="app__login-container">
            <Button onClick={() => setOpenSignup(true)}>Sign in</Button>
            <Button onClick={() => {
              setOpenSignup(true);
              setIsNewUser(true);
            }}>Sign up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        { posts.map(({id, post}) => <Post postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} key={id} user={user} />) }
      </div>

      <div className="app__footer">
        {user ? <ImageUpload username={user.displayName} /> : <h4><center>Sign in to post photos.</center></h4> }
      </div>
    </div>
  );
}

export default App;
