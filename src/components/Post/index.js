import React, {useState, useEffect} from 'react';
import firebase from "firebase";
import {db} from '../../firebase';
import './style.scss';
import Avatar from "@material-ui/core/Avatar"

function Post({postId, username, caption, imageUrl, user}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", "desc").onSnapshot(s => {
                setComments(s.docs.map(doc => ({id: doc.id, comment: doc.data()})));
            })
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment("");
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>

            <img className="post__image" src={imageUrl} alt=""/>

            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map(c => (
                    <div className="post__comment" key={c.id}><strong>{c.comment.username}</strong> {c.comment.text}</div>
                ))}
            </div>

            {user && (
                <form className="post__comment-box" onSubmit={postComment}>
                    <input className="post__input" type="text" placeholder="Add a comment..." onChange={e => setComment(e.target.value)} value={comment} />
                    <button className="post__button" type="submit">Post</button>
                </form>
            )}
        </div>
    )
}

export default Post;
