import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageUser = () => {
 
    const[axiosSecure]=useAxiosSecure()
    const {data:users=[],refetch} = useQuery({ 
        queryKey: ['users'],
        queryFn: async ()=>{
            const res=await axiosSecure.get('/users')
            //    console.log(res.data); 
            return res.data
        }
    })

    const handleAdmin=(user)=>{
        axiosSecure.patch(`/makeadminuser/${user._id}`)
        .then(result=>{
            if(result.data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${user.name} is an Admin Now`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleInstructor=(user)=>{
        axiosSecure.patch(`/makeinstructoruser/${user._id}`)
        .then(result=>{
            if(result.data.modifiedCount){
                const newInstructor={
                    name:user.name,
                    image:user?.image,
                    email:user.email
                    }
                     axios.post('https://summer-camp-school-server-hazel.vercel.app/instructors',newInstructor)
                     .then(res=>{
                        if(res.data.insertedId){
                            refetch()
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: `${user.name} is an Instructor Now`,
                                showConfirmButton: false,
                                timer: 1500
                              })
                        }
                     })
            }
        })
    }


    return (
        <div className="w-full">
            <Helmet>
                <title>Language School || Manage users</title>
            </Helmet>
           <h2 className="text-4xl font-medium font-mono text-center my-10">Manage Users</h2>
           <div className="overflow-x-auto mx-4">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                <tr className="bg-base-200 text-lg text-black font-mono font-bold">
                    <th>#</th>
                    <th>User Image</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody className="font-mono">
                {
                    users.map((user,idx)=> <tr
                    key={user._id}
                    >
                    <td className="text-xl">{idx+1}</td>
                    <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={user.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                    </div>
                    </td>
                    <td className="text-xl">{user.name}</td>
                    <td className="text-xl">{user.email}</td>
                    <td className="text-xl">{user.role}</td>
                    <td>
                        <div className="btn-group  gap-2 btn-group-vertical">
                        <button  onClick={()=>handleAdmin(user)} disabled={user?.role === 'admin' || user?.role === 'instructor'} className="btn bg-accent-focus hover:bg-accent-focus">Make Admin</button>
                        <button  onClick={()=>handleInstructor(user)} disabled={user?.role === 'instructor' || user?.role === 'admin'} className="btn bg-orange-500 hover:bg-orange-600 ">Make Instructor</button>
                        </div>
                    </td>
                </tr>)
                }
               
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ManageUser;