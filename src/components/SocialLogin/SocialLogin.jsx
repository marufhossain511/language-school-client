import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
     
    const {signInWithGoogle}=useContext(AuthContext)
    const navigate=useNavigate()

    const handleGoogleSignIn=()=>{

        signInWithGoogle()
        .then((result)=>{
            const loggedUser=result.user;
            console.log(loggedUser);
            const savedUser={name:loggedUser.displayName,email:loggedUser.email,role:'user',image:loggedUser.photoURL}
                    console.log(savedUser);
                    axios.post('http://localhost:5000/users',savedUser)
                    .then(()=>{
                        
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Login successfully',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              navigate('/')
                       
                    })
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    return (
        <div>
            <div>
            <div className='divider'></div>
            <div className='w-full text-center my-4'>
            <button onClick={handleGoogleSignIn} className=' btn bg-primary text-white btn-outline'>
                <FaGoogle></FaGoogle> Sign With Google
            </button>
            </div>
        </div>
        </div>
    );
};

export default SocialLogin;