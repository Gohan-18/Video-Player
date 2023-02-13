import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from '@firebase/auth'
import { loginMessage } from "../features/watchlist-slice";
import { useDispatch } from "react-redux";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_API_KEY,
  authDomain: import.meta.env.VITE_FIRESTORE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRESTORE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIRESTORE_APP_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCxmovnfmjVwrsJh8RSItG95L5My60XCkQ",
//   authDomain: "video-player-c5df7.firebaseapp.com",
//   projectId: "video-player-c5df7",
//   storageBucket: "video-player-c5df7.appspot.com",
//   messagingSenderId: "1086194225908",
//   appId: "1:1086194225908:web:00440e50117f41602804a1"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Authorization
export const auth = getAuth(app);
// Initialize Firestore database
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const signInWithGoogle = (dispatch) => {

  try{
    signInWithPopup(auth, googleProvider).then(res => {
      // console.log(res.user.email)
      dispatch(loginMessage({
        open: true,
        message: `Welcome ${res.user.displayName}`,
        type: 'success'
      }))
    })
  }
  catch(e){
    dispatch(loginMessage({
      open: true,
      message: e.message,
      type: 'error'
    }))
  }

}

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth () {

  const [user, setUser] = useState();
  const dispatch = useDispatch()

  // const signUp = ( email, password, displayName) => createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
  //     updateProfile(user, { displayName});
  //     setUser(user);
  //     return user;
  // })

  // const signIn = ( email, password) => signInWithEmailAndPassword(auth, email, password).then(({user}) => {
  //     setUser(user);
  //     return user;
  // }); 

  const signOutUser = () => signOut(auth)
  .then(() => {
    setUser(null);
    dispatch(loginMessage({
      open: true,
      message: `Logged out successfully!!`,
      type: 'success'
    }))
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, ( user ) => {
      user ? setUser(user) : setUser(null)
    });
  
    return () => unsubscribe()
  })

  // useEffect(() => {

  //   if(user) {
  //     const watchlistRef = doc(db, 'watchlist', user.uid);

  //     var unsubscribe = onSnapshot(watchlistRef, (videos) => {
  //       console.log('Firestore setter called');
  //       if(videos.exists()) {
  //         // const videos = videos.data();
  //         dispatch(addWatchlistFromFirestore(videos.data().videos))
  //       }
  //     });

  //     // return unsubscribe();

  //     return () => {
  //       unsubscribe();
  //     }
  //   }
  // }, [user])
  

  return {
    signOut: signOutUser,
    user
  }

}


export default AuthProvider;