import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
const UpdateClass = () => {
    const{user}=useContext(AuthContext)
    const loadData=useLoaderData()
    const [id,setId]=useState()
    const navigate=useNavigate()
    const {className,price,
        availableSeat,_id}=loadData
    const { register, handleSubmit,  formState: { errors } } = useForm();

    useEffect(()=>{
        fetch(`http://localhost:5000/classbyname?name=${className}`)
        .then(res=>res.json())
        .then(data=>{
            setId(data._id);
        })
    },[className])
    console.log(id);

    const onSubmit = data => {
        const updateClass={
               price:data.price,
               availableSeat:data.availableSeat,
               }
               console.log(updateClass);
        axios.patch(`http://localhost:5000/classes/${id}`,updateClass)
        .then((res)=>{
            if(res.data.modifiedCount > 0){
                const price=data.price
                axios.patch(`http://localhost:5000/instructorClass/${_id}`,{price})
                .then((response)=>{
                    if(response.data.modifiedCount > 0){

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'class update successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/dashboard/myclasses')
                    }
                })

            }
        })
    }
    return (
        <div className="w-3/4 px-20 shadow-2xl h-[700px] md:ml-24 mt-10 pt-20">
            <div className=" ">
                <h2 className="text-4xl font-mono font-bold text-center">Update Class</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input defaultValue={className} type="text" 
                        readOnly
                        placeholder="class name" className="input input-bordered w-full max-w-xs" />
                        
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
                        <input defaultValue={availableSeat} type="number" {...register("availableSeat", { required: true })} placeholder="Available Seats " className="input input-bordered w-full max-w-xs" />
                        {errors.availableSeat && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input defaultValue={price} type="number" {...register("price")} placeholder="price" className="input input-bordered w-full max-w-xs" />
                        </div>
                    <div>
                    <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input type="file" {...register("image")} disabled={true} className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                       
                    </div>
                    </div>
                   <input className="btn btn-block my-5 bg-accent-focus hover:bg-accent-focus text-white" type="submit" value="Update Class" />
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;