import firebase from "firebase/app"
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCEF7WtK0fu8LtD2dahcOhUX27HaUqyFH4",
    authDomain: "test-6a55f.firebaseapp.com",
    databaseURL: "https://test-6a55f.firebaseio.com",
    projectId: "test-6a55f",
    storageBucket: "test-6a55f.appspot.com",
    messagingSenderId: "921855781359",
    appId: "1:921855781359:web:9b13d6331ef2482c90ee1a"
};


firebase.initializeApp(firebaseConfig);

// @ts-ignore
export const firestore = firebase.firestore();
export default firebase;