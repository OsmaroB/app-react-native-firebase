import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCHjENlMrYacjnCwR0sYensmElLt0ILkdY",
    authDomain: "movilapp-reactnative-firebase.firebaseapp.com",
    projectId: "movilapp-reactnative-firebase",
    storageBucket: "movilapp-reactnative-firebase.appspot.com",
    messagingSenderId: "608029556316",
    appId: "1:608029556316:web:90793b24e60eebd24b7099",
    measurementId: "G-9F8XPGRGNH"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();

export default {
    firebase,
    db
};