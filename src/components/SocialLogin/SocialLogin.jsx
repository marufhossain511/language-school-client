import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";

const SocialLogin = () => {

    const {signInWithGoogle}=useContext(AuthContext)

    const handleGoogleSignIn=()=>{

        signInWithGoogle()
        .then((result)=>{
            console.log(result.user);
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
            <button onClick={handleGoogleSignIn} className='btn btn-circle btn-outline'>
                <FaGoogle></FaGoogle>
            </button>
            </div>
        </div>
        </div>
    );
};

export default SocialLogin;