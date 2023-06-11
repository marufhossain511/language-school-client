import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider=new GoogleAuthProvider()
const AuthProvider = ({children}) => {

    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState(null)

    // register
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // social Login
    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    // login
    const logIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // logout
    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }
    

    // update user 
    const updateUserProfile=(name,photo)=>{
        return updateProfile(auth.currentUser, {
            displayName:name, photoURL:photo
          })
    }

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            if(currentUser){
                axios.post('http://localhost:5000/jwt',{email:currentUser.email})
                .then(data=>{
                  // console.log(data.data.token);
                  localStorage.setItem('access-token',data.data.token)
                  setLoading(false)
                })
              }else{
                  localStorage.removeItem('access-token')
                  setLoading(false)
              }
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
       logOut,
       logIn,
    }

    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;