import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from '@firebase/auth'
import { addWatchlistFromFirestore } from "../features/watchlist-slice";
import { useDispatch } from "react-redux";


// const firebaseConfig = {
//   apiKey: "AIzaSyCOEGGnZEyUmQOK6MCTmKS3RqoUYTcZpVs",
//   authDomain: "clone-c029e.firebaseapp.com",
//   projectId: "clone-c029e",
//   storageBucket: "clone-c029e.appspot.com",
//   messagingSenderId: "758773996535",
//   appId: "1:758773996535:web:949429175327a6e9ab2cf2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCxmovnfmjVwrsJh8RSItG95L5My60XCkQ",
  authDomain: "video-player-c5df7.firebaseapp.com",
  projectId: "video-player-c5df7",
  storageBucket: "video-player-c5df7.appspot.com",
  messagingSenderId: "1086194225908",
  appId: "1:1086194225908:web:00440e50117f41602804a1"
};

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

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider).then(res => {
      console.log(res.user.email)
  })
}

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth () {

  const [user, setUser] = useState();
  const dispatch = useDispatch();

  // const signUp = ( email, password, displayName) => createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
  //     updateProfile(user, { displayName});
  //     setUser(user);
  //     return user;
  // })

  // const signIn = ( email, password) => signInWithEmailAndPassword(auth, email, password).then(({user}) => {
  //     setUser(user);
  //     return user;
  // }); 

  const signOutUser = () => signOut(auth).then(() => setUser(null));

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