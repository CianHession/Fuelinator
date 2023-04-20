// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANRjAuZrPCbVVBka45WB8uBTpurSEPGcc",
    authDomain: "fuelinator.firebaseapp.com",
    projectId: "fuelinator",
    storageBucket: "fuelinator.appspot.com",
    messagingSenderId: "848724945799",
    appId: "1:848724945799:web:432e614e6b83b181eb4122",
    measurementId: "G-DX0N482KPM",
    databaseURL: "https://fuelinator-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const createUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const logoutUser = (auth) => {
    return signOut(auth);
};