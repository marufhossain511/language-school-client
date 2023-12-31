import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import signUpImg from '../../assets/signUpAndLogin/login.png'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const IMAGE_HOSTING_TOKEN=import.meta.env.VITE_IMAGE_HOSTING_TOKEN
const SignUp = () => {
    // console.log(IMAGE_HOSTING_TOKEN);
    const { register, handleSubmit, reset,  formState: { errors } } = useForm();
    const image_hosting_url=`https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_TOKEN}`
    const [err,setErr]=useState('')
    const {createUser,updateUserProfile}=useContext(AuthContext)
    const navigate=useNavigate()
    const onSubmit = data => {
        
        // console.log(data)
        if(data.password !== data.confirmPassword){
            setErr('confirm password wrong')
            return
        }else{
         
        setErr('')
      const formData=new FormData
      formData.append('image',data.image[0])
      fetch(image_hosting_url,{
        method:'POST',
        body:formData
      })
      .then(res=>res.json())
      .then(imageData=>{
          if(imageData.success){
              const imageUrl=imageData.data.display_url
             createUser(data.email,data.password)
             .then((result)=>{
                 const loggedUser=result.user
                 console.log(loggedUser);
                 setErr('')
                //  console.log(data.name);
                updateUserProfile(data.name,imageUrl)
                .then(()=>{
                    setErr('')
                    const savedUser={name:data.name,email:data.email,role:'user',image:imageUrl}
                    console.log(savedUser);
                    axios.post('https://summer-camp-school-server-hazel.vercel.app/users',savedUser)
                    .then((result)=>{
                        if(result.data.insertedId){
                            reset()
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'user created successfully',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              navigate('/')
                        }
                    })
                    
                })
                .catch((err)=>{
                    setErr(err.message)
                })
             })
             .catch((err)=>{
                console.log(err.message);
                setErr(err.message)
             })
           }
      })
     }
     
    };
    const [show,setShow]=useState(false)
    return (
        <div className="py-20 md:flex bg-base-200">
            <Helmet>
                <title>Language School || Sign Up</title>
            </Helmet>
            <div className="md:w-1/2">
               <img src={signUpImg} alt="" />
            </div>
            <div className="md:w-1/2 px-4">
            <div className="hero min-h-screen ">
            <div className="hero-content w-full">
                <div className="text-center">
                </div>
                <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
                <h1 className="p-5 text-3xl font-bold">Sign Up!</h1>
                <form form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: true })} placeholder="email" className="input input-bordered" />
                    {errors.name && <span className='text-red-500'>This field is required</span>}
                    </div>
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
                    <input {...register("password", { 
                        required: true,
                        minLength:6, 
                        maxLength: 20,
                        pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/
                        })} type={show?'text':'password'} placeholder="password" className="input input-bordered" />
                    <div onClick={()=>setShow(!show)} className="absolute top-12 right-3 pl-3 flex items-center pointer-events-none">
                        <FaEye   className="text-gray-400 cursor-pointer" />
                    </div>
                    {errors.password?.type === 'required' && <p className='text-red-600'>password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-600'> password must be 6 characters</p>}
                {errors.password?.type === 'maxLength' && <p className='text-red-600'> password must be less than 20 characters</p>}
                {errors.password?.type === 'pattern' && <p className='text-red-600'> password must have one uppercase, one lowercase,one number and special characters</p>}
                    </div>
                    <div  className="form-control relative">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input {...register("confirmPassword", { required: true })} type={show?'text':'password'} placeholder="password" className="input input-bordered" />
                    <div onClick={()=>setShow(!show)} className="absolute top-12 right-3 pl-3 flex items-center pointer-events-none">
                        <FaEye   className="text-gray-400 cursor-pointer" />
                    </div>
                    {errors.confirmPassword && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered file-input-primary w-full" />
                    {errors.image && <span className='text-red-500'>This field is required</span>}
                    <label className="label">
                        <p  className="label-text-alt text-lg link link-hover">Already have a account? <Link to='/login' className='text-blue-600'>Login</Link></p>
                    </label>
                    {err && <span className="text-red-500">{err}</span>}
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Sign Up" />
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

export default SignUp;