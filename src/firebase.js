import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    // Replace with your Firebase config object
    apiKey: "AIzaSyDyIz-qslRS9KuwqiBDVs9-k2nSVp-gpZg",
    authDomain: "cowinclone.firebaseapp.com",
    projectId: "cowinclone",
    storageBucket: "cowinclone.appspot.com",
    messagingSenderId: "585257338360",
    appId: "1:585257338360:web:48968ebfecc31392e9820d",
    measurementId: "G-42JQ1LK2X9"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();