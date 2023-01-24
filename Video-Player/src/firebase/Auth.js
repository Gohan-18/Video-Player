// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { createContext, useContext } from "react";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCOEGGnZEyUmQOK6MCTmKS3RqoUYTcZpVs",
//   authDomain: "clone-c029e.firebaseapp.com",
//   projectId: "clone-c029e",
//   storageBucket: "clone-c029e.appspot.com",
//   messagingSenderId: "758773996535",
//   appId: "1:758773996535:web:949429175327a6e9ab2cf2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firestore
// export const db = getFirestore(app);

// const auth = getAuth(app);

// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const auth = useProvideAuth();
//   return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
// };

// export const useAuth = () => useContext(AuthContext);



// export default AuthProvider;