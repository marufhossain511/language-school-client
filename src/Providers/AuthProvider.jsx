import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";


export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider=new GoogleAuthProvider()
const AuthProvider = ({children}) => {

    const [loading,setLoading]=useState(false)
    const [user,setUser]=useState()

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }
    

    const updateUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName:name, photoURL:photo
          })
    }

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
        });
        return ()=>{
            return unsubscribe()
        }
    },[])


    const authInfo={
       createUser,
       updateUserProfile,
       signInWithGoogle,
       user,
       loading,
       logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;