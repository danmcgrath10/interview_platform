
import {initializeApp, getApp, getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD98_OknXnQ8V2bsQGxoporvqI862p86Zk",
    authDomain: "jobi-fb9cd.firebaseapp.com",
    projectId: "jobi-fb9cd",
    storageBucket: "jobi-fb9cd.firebasestorage.app",
    messagingSenderId: "867860693033",
    appId: "1:867860693033:web:7c61548631f7bff8fddc38",
    measurementId: "G-2ZMRZCYW66"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);