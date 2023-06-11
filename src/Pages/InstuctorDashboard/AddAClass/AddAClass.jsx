import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const IMAGE_HOSTING_TOKEN=import.meta.env.VITE_IMAGE_HOSTING_TOKEN
const AddAClass = () => {
    const {user}=useContext(AuthContext)
    const { register, handleSubmit, reset,  formState: { errors } } = useForm();
    const image_hosting_url=`https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_TOKEN}`
    const onSubmit = data => {
        const formData=new FormData
        formData.append('image',data.image[0])
        fetch(image_hosting_url,{
          method:'POST',
          body:formData
        })
        .then(res=>res.json())
        .then((imageData)=>{
            if(imageData.success){
                const imageUrl=imageData.data.display_url
                const price =parseFloat(data.price)
                const seat=parseFloat(data.availableSeat)
                const newClass={
                    className:data.className,
                    instructorName:data.instructorName,
                    instructorEmail:data.instructorEmail,
                    price:price,
                    availableSeat:seat,
                    image:imageUrl,
                    students:0,
                    status:'pending'
                }
                console.log(newClass);
                axios.post('http://localhost:5000/pendingclasses',newClass)
                .then((res)=>{
                    console.log(res.data);
                    if(res.data.insertedId){
                        reset()
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'class add successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })

            }
        })
    };

    return (
        <div className="w-3/4 px-20 shadow-2xl h-[700px] md:ml-24 mt-10 pt-20">
            <Helmet>
                <title>Language School || Add A Class</title>
            </Helmet>
            <div className=" ">
                <h2 className="text-4xl font-mono font-bold text-center">Add a Class</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input type="text" {...register("className", { required: true })} placeholder="class name" className="input input-bordered w-full max-w-xs" />
                        {errors.className && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Instructor Name</span>
                        </label>
                        <input defaultValue={user?.displayName} {...register("instructorName")} readOnly type="text" placeholder="class name" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Instructor Email</span>
                        </label>
                        <input defaultValue={user?.email} {...register("instructorEmail")}  readOnly type="text" placeholder="class name" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Available Seats</span>
                        </label>
                        <input type="number" {...register("availableSeat", { required: true })} placeholder="Available Seats " className="input input-bordered w-full max-w-xs" />
                        {errors.availableSeat && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="price" className="input input-bordered w-full max-w-xs" />
                        {errors.price && <span className="text-red-500">This field is required</span>}
                        </div>
                    <div>
                    <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                        {errors.image && <span className="text-red-500">This field is required</span>}
                    </div>
                    </div>
                   <input className="btn btn-block my-5 bg-accent-focus hover:bg-accent-focus text-white" type="submit" value="Add Class" />
                </form>
            </div>
        </div>
    );
};

export default AddAClass;