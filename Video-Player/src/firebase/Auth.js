import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { createContext, useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCOEGGnZEyUmQOK6MCTmKS3RqoUYTcZpVs",
  authDomain: "clone-c029e.firebaseapp.com",
  projectId: "clone-c029e",
  storageBucket: "clone-c029e.appspot.com",
  messagingSenderId: "758773996535",
  appId: "1:758773996535:web:949429175327a6e9ab2cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Authorization
const auth = getAuth(app);
// Initialize Firestore database
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(res => {
        
    })
}

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);



export default AuthProvider;