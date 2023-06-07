import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const auth = getAuth(app);

    const [loading,setLoading]=useState(false)

    const signUp=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL:photo
          })
    }


    const authInfo={
       signUp,
       updateProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;