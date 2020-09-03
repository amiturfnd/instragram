import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAs9-ikRTmPopbMTDmdWpx4f5jXQGaxOis",
    authDomain: "instagram-8675c.firebaseapp.com",
    databaseURL: "https://instagram-8675c.firebaseio.com",
    projectId: "instagram-8675c",
    storageBucket: "instagram-8675c.appspot.com",
    messagingSenderId: "378983494024",
    appId: "1:378983494024:web:9919353b91c871af974a3d",
    measurementId: "G-BX5BP3S5Q3"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
