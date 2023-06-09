import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/signUpAndLogin/login.png'
import { useForm } from 'react-hook-form';
import { FaEye} from "react-icons/fa";
import { useContext, useState } from 'react';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
const Login = () => {

  const [err,setErr]=useState()  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const {logIn}=useContext(AuthContext)
  const navigate=useNavigate()
  const onSubmit = data => {
    console.log(data)
    logIn(data.email,data.password)
    .then((result)=>{
        setErr('')
        const loggedUser=result.user
        console.log(loggedUser);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'login successfully',
            showConfirmButton: false,
            timer: 1500
          })
          reset()
          navigate('/')

    })
    .catch((err)=>{
        console.log(err.message);
        setErr(err.message)
    })
  };
  const [show,setShow]=useState(false)
    return (
        <div className="py-20 md:flex bg-base-200">
            <div className="md:w-1/2">
               <img src={loginImg} alt="" />
            </div>
            <div className="md:w-1/2 px-4">
            <div className="hero min-h-screen ">
            <div className="hero-content w-full">
                <div className="text-center">
                </div>
                <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                <h1 className="p-5 text-3xl font-bold">Login now!</h1>
                <form form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div  className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input {...register("password", { required: true })} type={show?'text':'password'} placeholder="password" className="input input-bordered" />
                    <div onClick={()=>setShow(!show)} className="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
                        <FaEye   className="text-gray-400 cursor-pointer" />
                    </div>
                    {errors.password && <span className='text-red-500'>This field is required</span>}
                    <label className="label">
                        <p  className="label-text-alt text-lg link link-hover">Do not have an account? <Link to='/signup' className='text-blue-600'>SignUp</Link></p>
                    </label>
                    </div>
                    {err && <span className="text-red-500">{err}</span>}
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Login" />
                    </div>
                </form>
                <SocialLogin></SocialLogin>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Login;